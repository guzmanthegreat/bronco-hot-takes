import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="website-title">Bronco Hot Takes</Link>
      <ul>
        <li><NavLink to="/new">New Post</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
      </ul>
      
    </nav>
  );
}
