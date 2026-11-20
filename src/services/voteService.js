import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

function getVoteRefs(postId, userId, replyId) {
  const parentPath = replyId
    ? ["posts", postId, "replies", replyId]
    : ["posts", postId];
  return {
    targetRef: doc(db, ...parentPath),
    voteRef: doc(db, ...parentPath, "votes", userId),
  };
}

export async function getUserVote(postId, userId, replyId = null) {
  const { voteRef } = getVoteRefs(postId, userId, replyId);
  const voteSnapshot = await getDoc(voteRef);
  return voteSnapshot.exists() ? voteSnapshot.data().value : 0;
}

export async function toggleVote(postId, userId, requestedValue, replyId = null) {
  const { targetRef, voteRef } = getVoteRefs(postId, userId, replyId);

  return runTransaction(db, async (transaction) => {
    const [postSnapshot, voteSnapshot] = await Promise.all([
      transaction.get(targetRef),
      transaction.get(voteRef),
    ]);

    if (!postSnapshot.exists()) {
      throw new Error("Post does not exist.");
    }

    const currentVote = voteSnapshot.exists() ? voteSnapshot.data().value : 0;
    const nextVote = currentVote === requestedValue ? 0 : requestedValue;
    const currentScore = postSnapshot.data().score || 0;
    const nextScore = currentScore + nextVote - currentVote;

    transaction.update(targetRef, { score: nextScore });

    if (nextVote === 0) {
      transaction.delete(voteRef);
    } else {
      transaction.set(voteRef, {
        userId,
        value: nextVote,
        createdAt: serverTimestamp(),
      });
    }

    return { score: nextScore, userVote: nextVote };
  });
}
