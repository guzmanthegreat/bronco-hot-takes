import { Link } from "react-router-dom";

// Placeholder so the app runs. Replace with the real navbar + user menu.
export default function Navbar() {
  return (
    <nav>
      <Link to="/">Bronco Hot Takes</Link> | <Link to="/new">New post</Link> |{" "}
      <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
    </nav>
  );
}
