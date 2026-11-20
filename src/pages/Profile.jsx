import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { getPostsByAuthor } from "../services/postService.js";
import { getPublicProfile } from "../services/profileService.js";
import "../styles/Profile.css";

export default function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const [loadedProfile, loadedPosts] = await Promise.all([
          getPublicProfile(userId),
          getPostsByAuthor(userId),
        ]);

        if (!active) return;
        setProfile(loadedProfile);
        setPosts(loadedPosts);
      } catch (loadError) {
        console.error("Could not load profile", loadError);
        if (active) setError("Could not load this profile.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [userId]);

  function updatePostScore(postId, score) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, score } : post,
      ),
    );
  }

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const username =
    profile?.username || posts[0]?.authorUsername || "Anonymous user";

  return (
    <section className="profile-page">
      <h1>@{username}'s posts</h1>

      {posts.length === 0 && <p>This user has not posted yet.</p>}

      <div className="feed-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onScoreChange={updatePostScore} />
        ))}
      </div>
    </section>
  );
}
