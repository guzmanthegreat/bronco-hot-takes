import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { createPost } from "../services/postService.js";
import "../styles/NewPost.css"

const MAX_LENGTH = 250;

export default function NewPost() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // submit button is disabled if description is empty or longer than MAX_LENGTH
  const isSubmitDisabled = title.trim() === "" || description.trim() === "" || description.length > MAX_LENGTH || saving;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await createPost({
        title,
        text: description,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 5),
        user: { uid: user.uid, username: user.username },
      });
      navigate("/");
    } catch (saveError) {
      console.error("Could not create post", saveError);
      setError("Could not save your post. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
      <form className="new-post" onSubmit={handleSubmit}>
        <h1 id="create-post-header">CREATE POST</h1>

        <div className="input-container">
          <label htmlFor="post-title">Post Title</label>
          <input type="text" id="post-title" name="post-title" placeholder="Enter post title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="100"></input>
        </div>

        <div className="input-container">
          <label htmlFor="post-description">Post Description</label>
          <textarea
            id="post-description"
            name="post-description"
            placeholder="Enter post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="char-count-container">
            <p>
              <span id="character-count">{description.length}</span>/{MAX_LENGTH} characters
            </p>
          </div>

        </div>

        <div className="input-container">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" name="tags" placeholder="Enter tags (Separate with commas)" value={tags} onChange={(e) => setTags(e.target.value)}></input>
        </div>

        <div className="button-container">
          <button type="submit" id="submit-button" disabled={isSubmitDisabled}>{saving ? "Saving..." : "Submit"}</button>
        </div>

        {error && <p className="error-message">{error}</p>}

      </form>

  )
}
