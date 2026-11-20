import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getUserVote, toggleVote } from "../services/voteService.js";

export default function VoteButtons({ postId, replyId = null, score, onScoreChange }) {
  const { user } = useAuth();
  const [userVote, setUserVote] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!user?.uid) return undefined;

    getUserVote(postId, user.uid, replyId)
      .then((vote) => {
        if (active) setUserVote(vote);
      })
      .catch((error) => console.error("Could not load vote", error));

    return () => {
      active = false;
    };
  }, [postId, replyId, user?.uid]);

  async function handleVote(value) {
    if (!user?.uid || saving) return;

    setSaving(true);
    setError("");
    try {
      const result = await toggleVote(postId, user.uid, value, replyId);
      setUserVote(result.userVote);
      onScoreChange(result.score);
    } catch (error) {
      console.error("Could not save vote", error);
      setError("Vote could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="post-card-votes">
      <button
        type="button"
        className={userVote === 1 ? "vote-button selected" : "vote-button"}
        onClick={() => handleVote(1)}
        disabled={saving}
        aria-pressed={userVote === 1}
        aria-label={replyId ? "Like comment" : "Like post"}
      >
        ▲ {score ?? 0}
      </button>
      <button
        type="button"
        className={userVote === -1 ? "vote-button selected" : "vote-button"}
        onClick={() => handleVote(-1)}
        disabled={saving}
        aria-pressed={userVote === -1}
        aria-label={replyId ? "Dislike comment" : "Dislike post"}
      >
        ▼
      </button>
      {error && <span className="vote-error">{error}</span>}
    </div>
  );
}
