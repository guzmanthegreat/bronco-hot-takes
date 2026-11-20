import { useState } from "react";

const samplePosts = [
  { id: 1, author: "user_one", text: "Sample hot take #1" },
  { id: 2, author: "user_two", text: "Sample hot take #2" },
  { id: 3, author: "user_three", text: "Sample hot take #3" },
];

const feedStyles = `
  .feed-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    background: #e5e5e5;
  }

  .post-card-body {
    min-height: 150px;
    padding: 0.75rem;
    border-radius: 10px;
    background: #fafafa;
  }

  .post-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .post-card-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #cfcfcf;
  }

  .post-card-text {
    margin: 0.75rem 0 0;
  }

  .post-card-actions button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
      .post-card-actions {
    display: flex;
    justify-content: space-between;
  }

  .post-card-votes {
    display: flex;
    gap: 0.5rem;
  }
`;

export default function Home() {
  const [loading] = useState(false);
  const [error] = useState(null);
  const posts = samplePosts;

  return (
    <section className="feed">
      <style>{feedStyles}</style>

      {loading && <p className="feed-loading">Loading posts...</p>}

      {error && (
        <p className="feed-error">Something went wrong loading posts.</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="feed-empty">No hot takes yet. Be the first to post!</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="feed-list">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-card-body">
                <header className="post-card-header">
                  <div className="post-card-avatar" />
                  <span className="post-card-username">{post.author}</span>
                </header>
                <p className="post-card-text">{post.text}</p>
              </div>

              <footer className="post-card-actions">
               <div className="post-card-votes">
                <button type="button" aria-label="Like" />
                <button type="button" aria-label="Second action" />
              </div>
              <button type="button" aria-label="Comment" />
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}