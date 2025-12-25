import errors from "@/config/locales/errors.json";
import { error } from "console";

type FirebaseErrorType = {
    [key: string]: string;
};
type FirebaseErrors = {
    [key: string]: FirebaseErrorType;
};
const firebaseErrors: FirebaseErrors = {
    ...errors,
    an_unknow_error_has_occurred: {
        an_unknow_error_has_occurred: errors.an_unknow_error_has_occurred,
    },
};

export function getFirebaseErrorMessage(
    errorCode: string,
    method: string
): string {
    const defaultErrorMessage = errors.an_unknow_error_has_occurred;

    if (!firebaseErrors[method]) {
        return defaultErrorMessage;
    }
    if (firebaseErrors[method][errorCode]) {
        return defaultErrorMessage;
    }

    const errorMessage = firebaseErrors[method][errorCode];

    return errorMessage;
}
