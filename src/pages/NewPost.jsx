import { useEffect } from "react"
import "../styles/NewPost.css"

export default function NewPost() {

  // javascript

  useEffect(() => {
  
    const textarea = document.getElementById('post-description');
    const characterCount = document.getElementById('character-count');
    const charCounterContainer = document.getElementById('char-count-container');
    const maxlength = textarea.getAttribute('maxlength');

    textarea.addEventListener('input', () => {
      const textareaLength = textarea.value.length;
      characterCount.textContent = textareaLength;

    });
  }, []);

  return (
    <div className="new-post">
      <h1>CREATE POST</h1>

      <div className="input-container">
        <label for="post-title">Post Title</label>
        <input type="text" id="post-title" name="post-title" placeholder="Enter post title"></input>
      </div>

      <div className="input-container">
        <label for="post-description">Post Description</label>
        <textarea id="post-description" name="post-description" maxlength="250" placeholder="Enter post description"></textarea>

        <div className="char-count-container">
          <span id="character-count">0</span>/250 characters
        </div>

      </div> 

      <div className="input-container">
        <label for="tags">Tags</label>
        <input type="text" id="tags" name="tags" placeholder="Enter tags (Separate with commas)"></input>
      </div>

      <div className="button-container">
        <button>Submit</button>
      </div>

    </div>
    
  )
}
