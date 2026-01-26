import { db } from "@/config/firebase-config";
import { doc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const firestoreCreateDocument = async (
    collectionName: string,
    documentId: string,
    data: object
) => {
    console.log("firestoreCreateDocument a été appelée avec :", {
        // Garde ce log pour le débogage
        collectionName,
        documentId,
        data,
    });
    try {
        const documentRef = doc(db, collectionName, documentId);
        console.log("Tentative d'écriture via setDoc..."); // <-- Log de traçage
        await setDoc(documentRef, data);
        console.log("Document créé avec succès !"); // Log de succès
        return { data: true, error: null };
    } catch (error) {
        console.error("Erreur lors de la création du document :", error); // Log d'erreur détaillé
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
    data: object
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
    data: object
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

// ...

// export const firestoreGetDocumentBook = async (
//     collectionName: string,
//     documentId: string,
// ) => {
//     try {
//         const documentRef = doc(db, collectionName, documentId);
//         const documentSnap = await getDoc(documentRef);
//         if (documentSnap.exists()) {
//             console.log("Document data:", documentSnap.data());
//         } else {
//             console.log("No such document!");
//         }
//         return { data: true };
//     } catch (error) {
//         const firebaseError = error as FirebaseError;
//         return {
//             error: {
//                 code: firebaseError.code,
//                 message: firebaseError.message,
//             },
//         };
//     }
// };
