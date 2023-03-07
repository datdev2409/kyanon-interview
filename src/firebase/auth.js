import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./app"

const auth = getAuth(app);

export async function signIn(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user
  }
  catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;

  if (error.code === "auth/invalid-email") {
    // Handle invalid email error
    throw Error("Invalid email address");
  } else if (error.code === "auth/wrong-password") {
    // Handle wrong password error
    throw Error("Incorrect password");
  } else if (error.code === "auth/user-not-found") {
    // Handle wrong password error
    throw Error("User not found");
  }
  else if (error.code === "auth/too-many-requests") {
    // Handle wrong password error
    throw Error("Too many requests, try again later");
  }
  else {
    // Handle other errors
    throw Error("Unknown error")
  }
  }

    // .then((userCredential) => {
    //   // Signed in 
    //   const user = userCredential.user;
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    // });
}
