import "../styles/Signup.css"
import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { signUp, isCppEmail, isValidUsername } from "../services/authService.js";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

 async function handleSubmit(event) {
     event.preventDefault();

      // clear past error messages
     setEmailError("");
     setPasswordError("");

      // if email and password fields are empty
     if (email.trim() === "") {
       setEmailError("Email is required.");
     }
    
     if (password.trim() === "") {
       setPasswordError("Password is required.");
     }

     if (username.trim() === "") {
       setEmailError("Username is required.");
     }
      // if both fields are empty stop the function
     if (email.trim() === "" || password.trim() === "" || username.trim() === "") {
       return;
     }

    if (!isValidUsername(username)) {
      setEmailError("Username must be 3–20 characters using letters, numbers, or underscores.");
      return;
    }

    // only Cal Poly Pomona emails are allowed
     if (!isCppEmail(email)) {
      setEmailError("You must use a @cpp.edu email.");
      return;
     }

    // if password is less than 6 characters
     if (password.trim().length < 6 && password.trim() !== "") {
      setPasswordError("Password must be at least 6 characters.");
      return;
     }

     // Connect to firebase

     try {

      const user = await signUp(email.trim(), password, username.trim());
      console.log("Account created: ", user.email);
      alert(`Account created! We sent a verification link to ${user.email}. Verify your email, then log in.`);
      navigate("/login");

     } catch (error) {

      // Display firebase authentication
      if (error.code === "auth/email-already-in-use" || error.code === "auth/invalid-email" || error.code === "auth/not-cpp-email" || error.code === "auth/invalid-username") {
        setEmailError(error.message);
      }
      else {
        setPasswordError(error.message);
      }
     }
 
   };
    return(
     <div className="signup-page">
          <form id="signup-form" onSubmit={handleSubmit}>

           <h1 className="signup-title">Sign up</h1>

            <div className="input-container">

             <label htmlFor="username">Anonymous username</label>
             <input type="text" id="username" name="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
             <p className="username-help">3–20 letters, numbers, or underscores</p>

           </div>

            <div className="input-container">

             <label htmlFor="user-email">Email</label>
             <input type="email" id="user-email" name="user-email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
             <p className="error-message">{emailError}</p>

           </div>

            <div className="input-container">
             <label htmlFor="user-password">Password</label>
             <input type="password" id="user-password" name="user-password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
             <p className="error-message">{passwordError}</p>
           </div>

            <div className="button-container">
             <button type="submit" id="submit-button">Create Account</button>
           </div>
 
         </form>

         <div className="login-redirect">
            <p className="already-have-account">Already have an account?</p>
            <Link to="/login" className="link-for-login">Login</Link>
          </div>

        </div>
   )
}
