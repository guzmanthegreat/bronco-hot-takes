import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { logOut } from "../services/authService.js";

// create context to share login information with other components
const AuthContext = createContext();

export function AuthProvider({ children }) {
    // store user logged in state
    const [user, setUser] = useState(null);

    //check if firebase finished loading authentication information
    const [loading, setLoading] = useState(true);

    // look for changes in firebase authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // update whenever the user logs in or logs out
            setUser(currentUser);

            // when firebase finishes checking the user's login status
            setLoading(false);

        })

        return () => unsubscribe();
        
    }, []);

    return (
        // only verified users count as logged in (signup briefly signs in unverified users)
        <AuthContext.Provider value = {{ user, loggedIn: !!user && user.emailVerified, loading, logout:logOut}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}