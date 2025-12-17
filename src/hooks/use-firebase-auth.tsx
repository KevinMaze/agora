import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<UserInterface | null>(null);
    const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);

    const formatAuthUser = (user: UserInterface | User) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
    });

    const getUserDocument = async (user: UserInterface) => {
        if (auth.currentUser) {
            const documentRef = doc(db, "user", auth.currentUser.uid);
            const compactUser = user;
            onSnapshot(documentRef, async (doc) => {
                if (doc.exists()) {
                    compactUser.userDocument = doc.data() as UserDocument;
                }
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser,
                    ...compactUser,
                }));
                setAuthUserIsLoading(false);
            });
        }
    };

    const authStateChanged = async (authSate: UserInterface | User | null) => {
        if (!authSate) {
            setAuthUser(null);
            setAuthUserIsLoading(false);
            return;
        }
        setAuthUserIsLoading(true);
        const formatedUser = formatAuthUser(authSate);
        await getUserDocument(formatedUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        authUserIsLoading,
    };
}
