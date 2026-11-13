import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css"

export default function Navbar({ loggedIn }) {
  return (
    <nav className="navbar">
      <Link to="/" className="website-title">Bronco Hot Takes</Link>
      <ul>
        {/* If user is logged in */}
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
