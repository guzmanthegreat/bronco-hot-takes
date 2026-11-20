import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { createReply } from "../services/replyService.js";

const MAX_REPLY_LENGTH = 250;

export default function ReplyForm({ postId, onSubmitted }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user || !text.trim() || text.length > MAX_REPLY_LENGTH || saving) return;

    setSaving(true);
    setError("");
    try {
      await createReply({ postId, text, user });
      setText("");
      onSubmitted();
    } catch (saveError) {
      console.error("Could not save comment", saveError);
      setError("Could not save your comment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a comment..."
        maxLength={MAX_REPLY_LENGTH}
        rows="2"
      />
      <div className="reply-form-footer">
        <span>{text.length}/{MAX_REPLY_LENGTH}</span>
        <button type="submit" disabled={!text.trim() || saving}>
          {saving ? "Posting..." : "Comment"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
