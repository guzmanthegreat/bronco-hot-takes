import "../styles/Signup.css"
import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { signUp } from "../services/authService.js";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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
      // if both fields are empty stop the function
     if (email.trim() === "" || password.trim() === "") {
       return;
     }

    // if password is less than 6 characters
     if (password.trim().length < 6 && password.trim() !== "") {
      setPasswordError("Password must be at least 6 characters.");
      return;
     }

     // Connect to firebase

     try {

      const user = await signUp(email.trim(), password);
      console.log("Account created: ", user.email);
      alert("Account successfully created!");
      navigate("/");

     } catch (error) {

      // Display firebase authentication
      if (error.code == "auth/email-already-in-use" || error.code == "auth/invalid-email") {
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