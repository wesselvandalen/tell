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
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UserData {
  email: string;
  role: string;
  createdAt: string;
  displayName?: string;
}

export const signInEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.email!);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User document doesn't exist");
    }
    return user;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const signUpEmailAndPassword = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user document in Firestore
    const userData: UserData = {
      email: user.email!,
      role: "user", // Default role
      createdAt: new Date().toISOString(),
      displayName
    };

    await setDoc(doc(db, "users", user.email!), userData);
    return user;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

export const signInGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    const userDocRef = doc(db, "users", user.email!);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User document doesn't exist");
    }

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export const registerWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    // Create user document in Firestore if it doesn't exist
    const userDocRef = doc(db, "users", user.email!);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const userData: UserData = {
        email: user.email!,
        role: "user", // Default role
        createdAt: new Date().toISOString(),
        displayName: user.displayName || undefined
      };
      await setDoc(userDocRef, userData);
    }

    return user;
  } catch (error) {
    console.error("Google registration error:", error);
    throw error;
  }
};

export const signUserOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
};