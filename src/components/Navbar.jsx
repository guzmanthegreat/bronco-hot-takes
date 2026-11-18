import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {

  // get login status from AuthContext
  const { loggedIn, loading, logout } = useAuth();
  const navigate = useNavigate();

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
            <li><button className="logout-button" 
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              Logout</button></li> 
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
