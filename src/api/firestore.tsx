import { db } from "@/config/firebase-config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
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

export const firestoreGetDocumentBook = async (
    collectionName: string,
    documentId: string
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);
        const documentSnap = await getDoc(documentRef);
        if (documentSnap.exists()) {
            console.log("Document data:", documentSnap.data());
        } else {
            console.log("No such document!");
        }
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
