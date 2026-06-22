import errors from "@/config/locales/errors.json";

type FirebaseErrorType = {
    [key: string]: string;
};
type FirebaseErrors = {
    [key: string]: FirebaseErrorType;
};

// Table de correspondance : méthode Firebase → code d'erreur → message utilisateur (français)
const firebaseErrors: FirebaseErrors = {
    ...errors,
    an_unknow_error_has_occurred: {
        an_unknow_error_has_occurred: errors.an_unknow_error_has_occurred,
    },
};

/**
 * Retourne un message d'erreur lisible en français à partir d'une erreur Firebase.
 * @param method - Nom de la méthode Firebase appelée (ex: "signInWithEmailAndPassword")
 * @param errorCode - Code d'erreur Firebase (ex: "auth/user-not-found")
 * @returns Message d'erreur traduit, ou message générique si inconnu
 */
export function getFirebaseErrorMessage(
    method: string,
    errorCode: string,
): string {
    const defaultErrorMessage = errors.an_unknow_error_has_occurred;

    if (!firebaseErrors[method]) {
        return defaultErrorMessage;
    }
    if (!firebaseErrors[method][errorCode]) {
        return defaultErrorMessage;
    }

    return firebaseErrors[method][errorCode];
}
