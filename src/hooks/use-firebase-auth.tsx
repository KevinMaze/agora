/**
 * Hook useFirebaseAuth — cœur du système d'authentification.
 *
 * Ce hook gère le cycle de vie complet de la session utilisateur :
 * 1. Écoute les changements d'état Firebase Auth via onAuthStateChanged
 * 2. À chaque connexion, abonne un listener Firestore en temps réel sur le document utilisateur
 * 3. Fusionne les données Auth (uid, email…) avec le profil Firestore (rôle, avatar, onboarding…)
 * 4. Désabonne proprement les listeners à la déconnexion ou au démontage du composant
 *
 * Le double listener (Auth + Firestore) garantit que tout changement de profil
 * (ex: rôle mis à jour par l'admin) est répercuté instantanément dans l'UI.
 */
import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<UserInterface | null>(null);
    const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);

    // Référence vers la fonction de désabonnement Firestore.
    // On utilise un ref (pas un state) pour éviter de déclencher des re-renders.
    const unsubscribeUserDocumentRef = useRef<null | (() => void)>(null);

    /**
     * Force un rechargement des données Auth depuis Firebase, puis met à jour le state.
     * Appelé après des actions qui modifient le profil (ex: fin de l'onboarding, upload d'avatar).
     */
    const reloadAuthUserData = () => {
        if (auth.currentUser) {
            auth.currentUser.reload().then(() => {
                authStateChanged(auth.currentUser);
            });
        }
    };

    /**
     * Extrait uniquement les champs Auth pertinents depuis un objet User Firebase.
     * Évite de stocker dans le state des données internes de Firebase non nécessaires.
     */
    const formatAuthUser = (user: UserInterface | User) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
    });

    /**
     * Abonne un listener Firestore en temps réel sur le document utilisateur.
     * À chaque mise à jour du document, le state authUser est mis à jour automatiquement.
     * Le listener précédent est désabonné avant d'en créer un nouveau.
     */
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

    /**
     * Callback déclenché à chaque changement d'état Firebase Auth.
     * - Si l'utilisateur se déconnecte (authSate = null) : nettoie le state et les listeners.
     * - Si l'utilisateur se connecte : formate ses données et charge son profil Firestore.
     */
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

    // Abonne le listener Auth global au montage du composant racine.
    // Retourne une fonction de nettoyage qui désabonne tout à la destruction.
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
