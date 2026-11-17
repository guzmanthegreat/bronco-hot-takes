import { useState } from "react"
import "../styles/NewPost.css"

const MAX_LENGTH = 250;

export default function NewPost() {
  const [description, setDescription] = useState("");

  // submit button is disabled if description is empty or longer than MAX_LENGTH
  const isSubmitDisabled = description.trim() === "" || description.length > MAX_LENGTH;

  return (
      <div className="new-post">
        <h1 id="create-post-header">CREATE POST</h1>

        <div className="input-container">
          <label htmlFor="post-title">Post Title</label>
          <input type="text" id="post-title" name="post-title" placeholder="Enter post title"></input>
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
          <input type="text" id="tags" name="tags" placeholder="Enter tags (Separate with commas)"></input>
        </div>

        <div className="button-container">
          <button type="submit" id="submit-button" disabled={isSubmitDisabled}>Submit</button>
        </div>

      </div>

  )
}
