import React from 'react'
import "../styles/Login.css"
import { Link } from "react-router-dom"

export default function Login() {


  // javascript
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
    <div className="login-page">

      <h1 className="welcome-back-text">WELCOME BACK</h1>
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form id="login-form" onSubmit={handleSubmit}>

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
            <button type="submit" id="submit-button">Sign in</button>
          </div>


        </form>

        <p className="sign-up-link">Don't have an account? <Link to="/signup">Sign up</Link></p>

      </div>
    </div>
  )
}
