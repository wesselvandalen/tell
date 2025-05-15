import { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import { AuthContext } from "./auth-context";
import type { AuthContextType } from "./auth-context";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser: any) => {
      try {
        setIsLoading(true);
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.email!);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(currentUser);
          } else {
            console.log("User document doesn't exist in Firestore");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = { user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};