import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<UserInterface | null>(null);
    const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);
    const unsubscribeUserDocumentRef = useRef<null | (() => void)>(null);

    //Reload authUserData function
    const reloadAuthUserData = () => {
        if (auth.currentUser) {
            auth.currentUser.reload().then(() => {
                authStateChanged(auth.currentUser);
            });
        }
    };

    const formatAuthUser = (user: UserInterface | User) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
    });

    const getUserDocument = useCallback(async (user: UserInterface) => {
        if (auth.currentUser) {
            const documentRef = doc(db, "users", auth.currentUser.uid);
            const compactUser = user;
            unsubscribeUserDocumentRef.current?.();
            unsubscribeUserDocumentRef.current = onSnapshot(
                documentRef,
                async (doc) => {
                if (doc.exists()) {
                    compactUser.userDocument = doc.data() as UserDocument;
                }
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser,
                    ...compactUser,
                }));
                setAuthUserIsLoading(false);
                },
            );
        }
    }, []);

    const authStateChanged = useCallback(
        async (authSate: UserInterface | User | null) => {
        if (!authSate) {
            unsubscribeUserDocumentRef.current?.();
            unsubscribeUserDocumentRef.current = null;
            setAuthUser(null);
            setAuthUserIsLoading(false);
            return;
        }
        setAuthUserIsLoading(true);
        const formatedUser = formatAuthUser(authSate);
        await getUserDocument(formatedUser);
        },
        [getUserDocument],
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => {
            unsubscribe();
            unsubscribeUserDocumentRef.current?.();
            unsubscribeUserDocumentRef.current = null;
        };
    }, [authStateChanged]);

    return {
        authUser,
        authUserIsLoading,
        reloadAuthUserData,
    };
}
