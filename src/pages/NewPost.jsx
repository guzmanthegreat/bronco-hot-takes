import "../styles/NewPost.css"

export default function NewPost() {
  return (
    <div className="new-post">
      <h1>CREATE POST</h1>

      <div className="text-input">
        <label for="post-title">Title</label>
        <input type="text" id="post-title" name="post-title" placeholder="Enter post title"></input>
      </div>

      <div className="text-input">
        <label for="post-description">Post Description</label>
        <textarea id="post-description" name="post-description" placeholder="Enter post description"></textarea>
      </div> 

      <div className="text-input">
        <label for="tags">Tags</label>
        <input type="text" id="tags" name="tags" placeholder="Enter tags (Separate with commas)"></input>
      </div>

    </div>
    
  )
}
