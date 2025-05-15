import { auth, db } from "../service/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const signInEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signUpEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signInGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result: UserCredential = await signInWithPopup(auth, provider);
  const user: User = result.user;

  const userDocRef = doc(db, "users", user.email!);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists() || !userDoc.data()?.role) {
    window.alert(`User doesn't exist`);
    throw new Error(`User doesn't exist`);
  }

  return user;
};

export const registerWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result: UserCredential = await signInWithPopup(auth, provider);
  const user: User = result.user;

  return user;
};

export const signUserOut = async (): Promise<void> => {
  return await signOut(auth);
};