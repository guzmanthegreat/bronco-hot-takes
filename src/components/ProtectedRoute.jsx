import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap a page with this to only allow logged-in (verified) users.
// Logged-out users are sent to the login page instead.
export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
