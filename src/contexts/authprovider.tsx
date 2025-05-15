import { useEffect, useState } from "react";
import { auth, db } from "../service/firebase"
import { AuthContext } from "./auth-context.ts";
import { doc, getDoc } from "firebase/firestore";

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser: any) => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.email);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser(currentUser);
                } else {
                    console.log(`User doesn't exist`);
                }
            } else {
                setUser(null);
            }
        })
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )

}