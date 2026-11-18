// firebase has these functions to authenticate email/password
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase/config.js";

// Only Cal Poly Pomona emails can create an account
const ALLOWED_DOMAIN = "@cpp.edu";

export const isCppEmail = (email) =>
  email.trim().toLowerCase().endsWith(ALLOWED_DOMAIN);

// Creates an error with a custom code so it goes through getErrorMsg like Firebase errors
const authError = (code) => {
  const error = new Error(getErrorMsg(code));
  error.code = code;
  return error;
};

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

    case "auth/not-cpp-email":
      return "You must use a @cpp.edu email.";

    case "auth/email-not-verified":
      return "Please verify your email first. Check your inbox for the link.";

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
export async function signUp(email, password) {
  /*creating the account with the function createUserWithEmailAndPassword(param1)
    Only @cpp.edu emails are allowed. After the account is created a verification
    email is sent and the user is signed out until they verify.

    @param {string} email - User's email address
    @param {string} password - User's password
    @return {Promise<User>} - Will return the newly created user account
    @throw {Error} - If an account can not be created, the registration fails
  */
  if (!isCppEmail(email)) {
    throw authError("auth/not-cpp-email");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    console.log("Verification email sent to: ", user.email);

    // Firebase signs new users in automatically; sign them out until they verify
    await signOut(auth);
    return user;
  } catch (error) {
    console.error("Error occured during signup", error.code, error.message);
    throw toAuthError(error);
  }
}

// Log In
export async function signIn(email, password) {
  /* Sign into an account using the correct email/password
     if password or email is incorrect and error will appear
     Users who have not verified their email are signed back out.
  */
  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in", error.code, error.message);
    throw toAuthError(error);
  }

  const user = userCredential.user;
  if (!user.emailVerified) {
    await signOut(auth);
    throw authError("auth/email-not-verified");
  }

  console.log("Signed in as: ", user.email);
  return user;
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
