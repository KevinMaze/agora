import { db } from "@/config/firebase-config";
import {
    doc,
    setDoc,
    updateDoc,
    addDoc,
    collection,
    deleteDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const firestoreCreateDocument = async (
    collectionName: string,
    documentId: string,
    data: object,
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await setDoc(documentRef, data);
        return { data: true, error: null };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            data: null,
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
    data: object,
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);

        await updateDoc(documentRef, data);
        return { data: true, error: null };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            data: null,
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};

export const firestoreAddDocument = async (
    collectionName: string,
    data: object,
) => {
    try {
        const documentRef = await addDoc(collection(db, collectionName), data);
        return { data: documentRef.id, error: null };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            data: null,
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};

export const firestoreDeleteDocument = async (
    collectionName: string,
    documentId: string,
) => {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await deleteDoc(documentRef);
        return { data: true, error: null };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            data: null,
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};
