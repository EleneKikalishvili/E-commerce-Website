import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCRVEsoShYRQva1C8qWHcOf37svv77zKf8",
  authDomain: "e-commerce-project-73797.firebaseapp.com",
  databaseURL: "https://e-commerce-project-73797.firebaseio.com",
  projectId: "e-commerce-project-73797",
  storageBucket: "e-commerce-project-73797.appspot.com",
  messagingSenderId: "987463567644",
  appId: "1:987463567644:web:d58dc7f570d28d7b9a52d9",
  measurementId: "G-0JNXCS44XL",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
