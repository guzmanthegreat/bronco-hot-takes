import { useEffect } from "react"
import "../styles/NewPost.css"

export default function NewPost() {

  // javascript

  useEffect(() => {
  
    const textarea = document.getElementById('post-description');
    const characterCount = document.getElementById('character-count');
    const charCounterContainer = document.getElementById('char-count-container');
    const maxlength = 250;
    const submitButton = document.getElementById('submit-button');

    textarea.addEventListener('input', () => {

      // update character count as user types into textareea
      const textareaLength = textarea.value.length;
      characterCount.textContent = textareaLength;

      // if textarea is empty or textarea length is greater than maxlength, submit button will be disabled
      if(textarea.value.trim() == '' || textareaLength > maxlength) {
        submitButton.disabled = true;
      }
      else{
        submitButton.disabled = false;
      }

    });

  }, []);



  return (
      <div className="new-post">
        <h1 id="create-post-header">CREATE POST</h1>

        <div className="input-container">
          <label for="post-title">Post Title</label>
          <input type="text" id="post-title" name="post-title" placeholder="Enter post title"></input>
        </div>

        <div className="input-container">
          <label for="post-description">Post Description</label>
          <textarea id="post-description" name="post-description" placeholder="Enter post description"></textarea>

          <div className="char-count-container">
            <p>
              <span id="character-count">0</span>/250 characters
            </p>
          </div>

        </div> 

        <div className="input-container">
          <label for="tags">Tags</label>
          <input type="text" id="tags" name="tags" placeholder="Enter tags (Separate with commas)"></input>
        </div>

        <div className="button-container">
          <button type="submit" id="submit-button" disabled>Submit</button>
        </div>

      </div>
    
  )
}
