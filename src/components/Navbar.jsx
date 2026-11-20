import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  // get login status from AuthContext
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="website-title">
        <img src="/assets/flame.png" alt="" className="flame-icon" />
        Bronco Hot Takes
      </Link>{" "}
      <ul>
        {/* If user is logged in or signed up successfully */}
        {loggedIn && (
          <>
            <li>
              <NavLink to="/new" className="nav-cta">New Post</NavLink>
            </li>
            {/* Pass logout function through button */}
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

        {/* If user is logged out */}
        {!loggedIn && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
