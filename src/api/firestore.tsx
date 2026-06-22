/**
 * Couche d'abstraction Firestore — fonctions CRUD génériques.
 *
 * Toutes les fonctions retournent un objet { data, error } :
 *  - En cas de succès : { data: <résultat>, error: null }
 *  - En cas d'échec  : { data: null, error: { code, message } }
 *
 * Cela permet une gestion uniforme des erreurs dans les composants
 * sans avoir à gérer les exceptions Firebase directement.
 */
import { db } from "@/config/firebase-config";
import {
    doc,
    setDoc,
    updateDoc,
    addDoc,
    collection,
    deleteDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

/**
 * Crée un document Firestore avec un ID prédéfini.
 * Utilisé notamment pour créer le profil utilisateur avec l'UID Firebase Auth.
 * @param collectionName - Nom de la collection cible (ex: "users")
 * @param documentId - ID à assigner au document (ex: UID de l'utilisateur)
 * @param data - Données du document à créer
 */
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

/**
 * Met à jour partiellement un document Firestore existant (merge partiel).
 * Seuls les champs fournis dans `data` sont modifiés, les autres sont conservés.
 * @param collectionName - Nom de la collection cible
 * @param documentId - ID du document à mettre à jour
 * @param data - Champs à mettre à jour
 */
export const firestoreUpdateDocument = async (
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

/**
 * Ajoute un nouveau document dans une collection avec un ID auto-généré par Firestore.
 * Retourne l'ID généré en cas de succès.
 * @param collectionName - Nom de la collection cible
 * @param data - Données du document à créer
 */
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

/**
 * Supprime un document Firestore par son ID.
 * @param collectionName - Nom de la collection cible
 * @param documentId - ID du document à supprimer
 */
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

/**
 * Supprime tous les documents d'une collection qui correspondent à un filtre.
 * Utilisé pour les suppressions en cascade (ex: supprimer tous les avis d'un livre supprimé).
 * Les suppressions sont exécutées en parallèle avec Promise.all pour la performance.
 * @param collectionName - Nom de la collection cible
 * @param field - Champ Firestore sur lequel filtrer
 * @param value - Valeur attendue pour le filtre (opérateur ==)
 */
export const firestoreDeleteDocumentsByQuery = async (
    collectionName: string,
    field: string,
    value: string,
) => {
    try {
        const q = query(
            collection(db, collectionName),
            where(field, "==", value),
        );
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((document) =>
            deleteDoc(doc(db, collectionName, document.id)),
        );

        await Promise.all(deletePromises);

        return {
            data: { deletedCount: querySnapshot.docs.length },
            error: null,
        };
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
