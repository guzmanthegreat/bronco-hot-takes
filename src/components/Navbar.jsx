import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  // get login status from AuthContext
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // hamburger menu (only shown on small screens, see Navbar.css)
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // close the menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // close the menu on Escape or a click outside the navbar
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  async function handleLogout() {
    setMenuOpen(false);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="navbar" ref={navRef}>
      <Link to="/" className="website-title">
        <img src="/assets/flame.png" alt="" className="flame-icon" />
        Bronco Hot Takes
      </Link>

      {/* hamburger button: hidden on desktop by CSS */}
      <button
        type="button"
        className={menuOpen ? "menu-toggle open" : "menu-toggle"}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
      </button>

      <ul id="nav-links" className={menuOpen ? "nav-links open" : "nav-links"}>
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
