import { db } from "@/config/firebase-config";
import { doc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const firestoreCreateDocument = async (
    collectionName: string,
    documentId: string,
    data: object,
) => {
    console.log("firestoreCreateDocument a été appelée avec :", {
        collectionName,
        documentId,
        data,
    }); // <-- Ajoutez ceci
    try {
        const documentRef = doc(db, collectionName, documentId);
        await setDoc(documentRef, data);
        console.log("Document créé avec succès !"); // <-- Ajoutez ceci en cas de succès
        return { data: true };
    } catch (error) {
        console.error(
            "Une erreur s'est produite lors de la création du document :",
            error,
        ); // <-- Modifiez ceci pour être sûr de tout loguer
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
    data: object,
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

export const firestoreAddDocument = async (
    collectionName: string,
    data: object,
) => {
    try {
        const documentRef = await addDoc(collection(db, collectionName), data);
        return { data: documentRef.id };
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
