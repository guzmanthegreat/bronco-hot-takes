import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

export async function getReplies(postId, sortMode = "recent") {
  const repliesQuery = query(
    collection(db, "posts", postId, "replies"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(repliesQuery);
  const replies = snapshot.docs.map((reply) => ({ id: reply.id, ...reply.data() }));

  if (sortMode === "trending") {
    replies.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }

  return replies;
}

export async function createReply({ postId, text, user }) {
  const postRef = doc(db, "posts", postId);
  const replyRef = doc(collection(db, "posts", postId, "replies"));

  return runTransaction(db, async (transaction) => {
    const postSnapshot = await transaction.get(postRef);
    if (!postSnapshot.exists()) {
      throw new Error("Post does not exist.");
    }

    const reply = {
      postId,
      text: text.trim(),
      authorId: user.uid,
      authorUsername: user.username,
      createdAt: serverTimestamp(),
      score: 0,
    };

    transaction.set(replyRef, reply);
    transaction.update(postRef, {
      replyCount: (postSnapshot.data().replyCount || 0) + 1,
    });

    return { id: replyRef.id, ...reply };
  });
}
