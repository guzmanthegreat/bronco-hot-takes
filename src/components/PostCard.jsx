import { useState } from "react";
import { Link } from "react-router-dom";
import ReplyForm from "./ReplyForm.jsx";
import ReplyList from "./ReplyList.jsx";
import VoteButtons from "./VoteButtons.jsx";

function getPostDate(createdAt) {
  if (createdAt?.toDate) return createdAt.toDate();
  if (createdAt instanceof Date) return createdAt;
  return null;
}

function formatPostedTime(createdAt) {
  const date = getPostDate(createdAt);
  if (!date) return "Posted just now";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Posted just now";
  if (seconds < 3600) return `Posted ${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `Posted ${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `Posted ${Math.floor(seconds / 86400)}d ago`;

  return `Posted ${date.toLocaleDateString()}`;
}

export default function PostCard({ post, onScoreChange }) {
  const [replyCount, setReplyCount] = useState(post.replyCount ?? 0);
  const [replyRefreshKey, setReplyRefreshKey] = useState(0);

  function handleReplySubmitted() {
    setReplyCount((current) => current + 1);
    setReplyRefreshKey((current) => current + 1);
  }

  return (
    <article className="post-card">
      <div className="post-card-body">
        <header className="post-card-header">
          <img src="/assets/avatar.png" alt="" className="post-card-avatar" />{" "}
          <Link to={`/profile/${post.authorId}`} className="post-card-username">
            @{post.authorUsername}
          </Link>
        </header>
        <h2>{post.title}</h2>
        <p className="post-card-text">{post.text}</p>
        <time
          className="post-card-time"
          dateTime={getPostDate(post.createdAt)?.toISOString()}
        >
          {formatPostedTime(post.createdAt)}
        </time>
      </div>

      <footer className="post-card-actions">
        <VoteButtons
          postId={post.id}
          score={post.score}
          onScoreChange={(score) => onScoreChange(post.id, score)}
        />
        <span className="reply-count">{replyCount} Comments</span>
      </footer>

      <ReplyList postId={post.id} refreshKey={replyRefreshKey} />
      <ReplyForm postId={post.id} onSubmitted={handleReplySubmitted} />
    </article>
  );
}
