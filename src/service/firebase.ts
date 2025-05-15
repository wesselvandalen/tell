import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBaP9APfVtEPw1sLQgHx26ZEZ7SPfutv28",
    authDomain: "tell-4f02c.firebaseapp.com",
    projectId: "tell-4f02c",
    storageBucket: "tell-4f02c.firebasestorage.app",
    messagingSenderId: "1032114981963",
    appId: "1:1032114981963:web:719ae9a5040929b739d1ce"
};

const app: any = initializeApp(firebaseConfig);
export const auth: any = getAuth(app);

export const db: any = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});