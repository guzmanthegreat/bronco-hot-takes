// firebase has these functions to authenticate email/password
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config.js";

// To make more readable errors
export const getErrorMsg = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "Account does not exist.";

    case "auth/invalid-email":
      return "Enter a valid email.";

    case "auth/email-already-in-use":
      return "Email is already being used.";

    default:
      return "Something went wrong. Please try again!";
  }
};

const toAuthError = (error) => {
  const errorMessage = new Error(getErrorMsg(error.code));
  errorMessage.code = error.code;
  return errorMessage;
};

//Sign up Function
export function signUp(email, password) {
  /*creating the account with the function createUserWithEmailAndPassword(param1)
    if the accounts was succesfully created it will return the user information 
    else it will throw an error

    @param {string} email - User's email address
    @param {string} password - User's password
     @return {Promise<User>} - Will return the newly created user account
    @throw {FirebaseError} - If an account can not be created, the registration fails
  */
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in as: ", userCredential.user.email); //adding the user? retruns undefined w/o needing hte catch
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error occured during signup", error.code, error.message);
      throw toAuthError(error); // used by
    });
}

// Log In
export function signIn(email, password) {
  /* Sign into an account using the correct email/password
     if password or email is incorrect and error will appear 
  */
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in as: ", userCredential.user.email);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error logging in", error.code, error.message);
      throw toAuthError(error);
    });
}

// Log Out
export function logOut() {
  /* Log out of an account
     If there is some sort of problem then a user can not log out
  */
  return signOut(auth)
    .then(() => {
      console.log("Sucessfully logged out");
    })
    .catch((error) => {
      console.error("Could not sign out: ", error.code, error.message);
      throw toAuthError(error);
    });
}
