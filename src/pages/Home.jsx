import { useEffect, useState } from "react";
import { getRecentPosts } from "../services/postService.js";
import PostCard from "../components/PostCard.jsx";
import "../styles/Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortMode, setSortMode] = useState("recent");

  useEffect(() => {
    async function loadPosts() {
      try {
        setPosts(await getRecentPosts(sortMode));
      } catch (loadError) {
        console.error("Could not load posts", loadError);
        setError("Something went wrong loading posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [sortMode]);

  function updatePostScore(postId, score) {
    setPosts((currentPosts) => currentPosts.map((post) =>
      post.id === postId ? { ...post, score } : post
    ));
  }

  return (
    <section className="feed">
      <div className="feed-toolbar">
        <label htmlFor="feed-sort">Sort posts</label>
        <select
          id="feed-sort"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
        >
          <option value="recent">Most recent</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {loading && <p className="feed-loading">Loading posts...</p>}

      {error && <p className="feed-error">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="feed-empty">No hot takes yet. Be the first to post!</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="feed-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onScoreChange={updatePostScore}
            />
          ))}
        </div>
      )}
    </section>
  );
}
