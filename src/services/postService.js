import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

export async function createPost({ title, text, tags, user }) {
  const post = {
    title: title.trim(),
    text: text.trim(),
    tags,
    authorId: user.uid,
    authorUsername: user.username,
    createdAt: serverTimestamp(),
    score: 0,
    replyCount: 0,
  };

  const created = await addDoc(collection(db, "posts"), post);
  return { id: created.id, ...post };
}

export async function getRecentPosts(sortMode = "recent", maxPosts = 50) {
  const postsQuery = query(
    collection(db, "posts"),
    orderBy(sortMode === "trending" ? "score" : "createdAt", "desc"),
    limit(maxPosts)
  );
  const snapshot = await getDocs(postsQuery);
  return snapshot.docs.map((post) => ({ id: post.id, ...post.data() }));
}

export async function getPostsByAuthor(authorId) {
  const postsQuery = query(
    collection(db, "posts"),
    where("authorId", "==", authorId)
  );
  const snapshot = await getDocs(postsQuery);
  return snapshot.docs
    .map((post) => ({ id: post.id, ...post.data() }))
    .sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() ?? 0;
      const bTime = b.createdAt?.toMillis?.() ?? 0;
      return bTime - aTime;
    });
}
