/**
 * Couche d'authentification Firebase.
 *
 * Toutes les fonctions enveloppent les méthodes Firebase Auth et retournent
 * un objet { data, error } normalisé pour une gestion d'erreur cohérente.
 * Les messages d'erreur sont traduits en français via getFirebaseErrorMessage.
 */
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/utils/getFirebaseErrorMessage";

/**
 * Crée un nouveau compte utilisateur avec email et mot de passe.
 * Retourne l'objet User Firebase en cas de succès.
 * Le profil Firestore est créé séparément dans le flux d'inscription.
 */
export const firebaseCreateUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        return { data: userCredential.user };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getFirebaseErrorMessage(
            "createUserWithEmailAndPassword",
            firebaseError.code,
        );

        return {
            error: {
                code: firebaseError.code,
                message: errorMessage,
            },
        };
    }
};

/**
 * Connecte un utilisateur existant avec son email et mot de passe.
 * Retourne l'objet User Firebase en cas de succès.
 */
export const firebaseSignInUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        return { data: userCredential.user };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getFirebaseErrorMessage(
            "signInWithEmailAndPassword",
            firebaseError.code,
        );

        return {
            error: {
                code: firebaseError.code,
                message: errorMessage,
            },
        };
    }
};

/**
 * Déconnecte l'utilisateur actuellement connecté.
 * La déconnexion est gérée globalement via onAuthStateChanged dans useFirebaseAuth.
 */
export const firebaseLogoutUser = async () => {
    try {
        await signOut(auth);
        return { data: true };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getFirebaseErrorMessage(
            "signOut",
            firebaseError.code,
        );
        return {
            error: {
                code: firebaseError.code,
                message: errorMessage,
            },
        };
    }
};

/**
 * Envoie un email de réinitialisation de mot de passe à l'adresse fournie.
 * Firebase gère la génération du lien sécurisé et l'envoi de l'email.
 */
export const sendEmailToResetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { data: true };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getFirebaseErrorMessage(
            "sendPasswordResetEmail",
            firebaseError.code,
        );
        return {
            error: {
                code: firebaseError.code,
                message: errorMessage,
            },
        };
    }
};

/**
 * Envoie un email de vérification à l'utilisateur connecté.
 * Nécessite qu'un utilisateur soit actuellement authentifié (auth.currentUser).
 */
export const sendEmailVerificationProcedure = async () => {
    if (auth.currentUser) {
        try {
            await sendEmailVerification(auth.currentUser);
            return { data: true };
        } catch (error) {
            const firebaseError = error as FirebaseError;
            const errorMessage = getFirebaseErrorMessage(
                "sendEmailVerification",
                firebaseError.code,
            );
            return {
                error: {
                    code: firebaseError.code,
                    message: errorMessage,
                },
            };
        }
    } else {
        return {
            error: {
                code: "unknow",
                message: "Une erreur est survenue",
            },
        };
    }
};

/**
 * Met à jour les données d'identification Firebase Auth de l'utilisateur connecté
 * (displayName, photoURL). Ces données sont distinctes du profil Firestore.
 * @param _uid - UID de l'utilisateur (non utilisé, Firebase Auth utilise auth.currentUser)
 * @param data - Données Auth à mettre à jour (ex: { displayName, photoURL })
 */
export const updateUserIdentificationData = async (
    _uid: string,
    data: object,
) => {
    if (auth.currentUser) {
        try {
            await updateProfile(auth.currentUser, data);
            return { data: true };
        } catch (error) {
            const firebaseError = error as FirebaseError;
            const errorMessage = getFirebaseErrorMessage(
                "updateProfile",
                firebaseError.code,
            );
            return {
                error: {
                    code: firebaseError.code,
                    message: errorMessage,
                },
            };
        }
    }
};
