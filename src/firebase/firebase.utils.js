import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBA32RmKToEgw1CDQpRV1NyhNAipQZA1oE",
  authDomain: "crwn-db-d069f.firebaseapp.com",
  databaseURL: "https://crwn-db-d069f.firebaseio.com",
  projectId: "crwn-db-d069f",
  storageBucket: "crwn-db-d069f.appspot.com",
  messagingSenderId: "974531110995",
  appId: "1:974531110995:web:a92d66a1f79faaea733ea6",
  measurementId: "G-MB17EWHPTH",
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
