import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css"
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {

  // get login status from AuthContext
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="website-title">Bronco Hot Takes</Link>
      <ul>
        {/* If user is logged in or signed up successfully */}
        {loggedIn && (
          <>
            <li><NavLink to="/new">New Post</NavLink></li>
            {/* Pass logout function through button */}
            <li><button className="logout-button">Logout</button></li> 
          </>
        )}

        {/* If user is logged out */}
        {!loggedIn && (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        )}
      </ul>
      
    </nav>
  );
}
