import "../styles/Signup.css"
import React from 'react'
import { Link } from "react-router-dom"


export default function Signup() {
  function handleSubmit(event) {
      event.preventDefault();
  
      const email = document.getElementById("user-email").value;
      const password = document.getElementById("user-password").value;
      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");
  
      // clear past error messages
      emailError.textContent = "";
      passwordError.textContent = "";
  
      // if email and password fields are empty
      if (email.trim() === "") {
        emailError.textContent = "Email is required.";
      }
      
      if (password.trim() === "") {
        passwordError.textContent = "Password is required";
      }
  
      // if both fields are empty stop the function
      if (email.trim() === "" || password.trim() === "") {
        return;
      }
  
  
    };
  
    return(
      <div className="signup-page">
  
          <form id="signup-form" onSubmit={handleSubmit}>

            <h1 className="signup-title">Sign up</h1>
  
            <div className="input-container">
              <label for="user-email">Email</label>
              <input type="email" id="user-email" name="user-email" placeholder="Enter email"></input>
              <p className="error-message" id="email-error"></p>
            </div>
  
            <div className="input-container">
              <label for="password">Password</label>
              <input type="password" id="user-password" name="user-password" placeholder="Enter password"></input>
              <p className="error-message" id="password-error"></p>
            </div>
  
            <div className="button-container">
              <button type="submit" id="submit-button">Create Account</button>
            </div>
  
  
          </form>
  
          <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
  
        </div>
    )
}
