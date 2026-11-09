import { useEffect } from "react"
import "../styles/Login.css"

export default function Login() {


  // javascript
  useEffect(() => {
  
    function handleSubmit(event) {
      const email = document.getElementById("user-email").value;


    }

    });

  }, []);


  return(
    <div className="login-page">
      <h1 className="header-text">WELCOME BACK</h1>

      <form id="login-form">

        <div className="input-container">
          <label for="user-email">Email</label>
          <input type="email" id="user-email" name="user-email" placeholder="Enter email"></input>
          <p className="error-message" id="email-error">error here</p>
        </div>

        <div className="input-container">
          <label for="password">Password</label>
          <input type="password" id="user-password" name="user-password" placeholder="Enter password"></input>
          <p className="error-message" id="password-error">error here</p>
        </div>

        <div className="button-container">
          <button type="submit" id="submit-button">Sign in</button>
        </div>


      </form>

      <p className="sign-up-link">Don't have an account? Sign up</p>

    </div>
  )
}
