import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/config.js";
import { db } from "../firebase/config.js";
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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // update whenever the user logs in or logs out
            try {
                if (currentUser && currentUser.emailVerified) {
                    // Mark the Firebase login immediately so route protection does not race
                    // with the separate username lookup.
                    setUser({ ...currentUser, username: "anonymous" });

                    try {
                        const userSnapshot = await getDoc(doc(db, "users", currentUser.uid));
                        setUser((current) => current
                            ? { ...current, username: userSnapshot.data()?.username || "anonymous" }
                            : current);
                    } catch (profileError) {
                        console.error("Could not load username", profileError);
                    }
                } else {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Could not load user profile", error);
                setUser(currentUser);
            }

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
