import { db } from "@/config/firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const firestoreCreateDocument = async (
    collectionName: string,
    documentId: string,
    data: object
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);

        await setDoc(documentRef, data);
        return { data: true };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};

export const firestoreUptadeDocument = async (
    collectionName: string,
    documentId: string,
    data: object
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);

        await updateDoc(documentRef, data);
        return { data: true };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};
