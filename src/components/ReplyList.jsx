import { useEffect, useState } from "react";
import { getReplies } from "../services/replyService.js";
import VoteButtons from "./VoteButtons.jsx";
import { Link } from "react-router-dom";

export default function ReplyList({ postId, refreshKey }) {
  const [replies, setReplies] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortMode, setSortMode] = useState("recent");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getReplies(postId, sortMode)
      .then((loadedReplies) => {
        if (active) setReplies(loadedReplies);
      })
      .catch((loadError) => {
        console.error("Could not load replies", loadError);
        if (active) setError("Could not load comments.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [postId, refreshKey, sortMode]);

  if (loading) return <p className="reply-status">Loading comments...</p>;
  if (error) return <p className="reply-status error-message">{error}</p>;
  if (replies.length === 0)
    return <p className="reply-status">No comments yet.</p>;

  const visibleReplies = expanded ? replies : replies.slice(0, 2);

  function updateReplyScore(replyId, score) {
    setReplies((currentReplies) =>
      currentReplies.map((reply) =>
        reply.id === replyId ? { ...reply, score } : reply,
      ),
    );
  }

  return (
    <div className="reply-section">
      <div className="reply-toolbar">
        <label htmlFor={`comment-sort-${postId}`}>Sort comments</label>
        <select
          id={`comment-sort-${postId}`}
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
        >
          <option value="recent">Most recent</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      <div className="reply-list">
        {visibleReplies.map((reply) => (
          <div className="reply" key={reply.id}>
            <div className="reply-content">
              <Link
                to={`/profile/${reply.authorId}`}
                className="reply-author"
              >
                @{reply.authorUsername}
              </Link>
              <span>{reply.text}</span>
            </div>
            <VoteButtons
              postId={postId}
              replyId={reply.id}
              score={reply.score}
              onScoreChange={(score) => updateReplyScore(reply.id, score)}
            />
          </div>
        ))}

        {replies.length > 2 && (
          <button
            type="button"
            className="view-more-replies"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded
              ? "Show fewer comments"
              : `View ${replies.length - 2} more comments`}
          </button>
        )}
      </div>
    </div>
  );
}
