import { db } from "@/config/firebase-config"; // Je suppose que votre configuration Firebase est ici
import { BookDocument } from "@/types/book";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const BOOKS_COLLECTION = "books"; // Le nom de votre collection de livres dans Firestore

/**
 * Récupère un document de livre unique depuis Firestore.
 * @param bookId L'UID du livre à récupérer.
 * @returns Une promesse qui se résout avec le BookDocument si trouvé, sinon null.
 */
export const getBook = async (bookId: string): Promise<BookDocument | null> => {
    try {
        const docRef = doc(db, BOOKS_COLLECTION, bookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as unknown as BookDocument;
        } else {
            console.log("Aucun document de ce type !");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du document:", error);
        throw error;
    }
};

/**
 * Récupère tous les documents de livres de la collection Firestore.
 * @returns Une promesse qui se résout avec un tableau de BookDocuments.
 */
export const getBooks = async (): Promise<BookDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, BOOKS_COLLECTION));
        const books = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
        return books;
    } catch (error) {
        console.error("Erreur lors de la récupération des documents: ", error);
        throw error;
    }
};

/**
 * Récupère les livres par catégorie.
 * @param category La catégorie par laquelle filtrer.
 * @returns Une promesse qui se résout avec un tableau de BookDocuments.
 */
export const getBooksByCategory = async (
    category: string
): Promise<BookDocument[]> => {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where("Category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des documents par catégorie: ",
            error
        );
        throw error;
    }
};
