/**
 * API livres — lecture Firestore pour la collection "books".
 *
 * Toutes les fonctions retournent des BookDocument[] ou BookDocument | null.
 * Les erreurs sont remontées via throw (différent des autres API qui retournent { error })
 * afin que le composant appelant puisse les gérer dans son propre try/catch.
 */
import { db } from "@/config/firebase-config";
import { BookDocument } from "@/types/book";
import {
    collection,
    doc,
    getDoc,
    limit,
    orderBy,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const BOOKS_COLLECTION = "books";

/**
 * Récupère un livre précis depuis Firestore par son ID.
 * Retourne null si le document n'existe pas.
 * @param bookId - L'ID Firestore du livre
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
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du livre:", error);
        throw error;
    }
};

/**
 * Récupère tous les livres de la bibliothèque sans filtre ni tri.
 */
export const getBooks = async (): Promise<BookDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, BOOKS_COLLECTION));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des livres:", error);
        throw error;
    }
};

/**
 * Récupère les livres filtrés par catégorie.
 * @param category - La catégorie à filtrer (doit correspondre au champ "Category" en Firestore)
 */
export const getBooksByCategory = async (
    category: string,
): Promise<BookDocument[]> => {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where("Category", "==", category),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des livres par catégorie:", error);
        throw error;
    }
};

/**
 * Récupère les 10 livres les plus récents, triés par date de création décroissante.
 * Utilisé sur la page d'accueil pour afficher les dernières nouveautés.
 */
export const getLastTenBooks = async (): Promise<BookDocument[]> => {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            orderBy("creation_date", "desc"),
            limit(10),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des 10 derniers livres:", error);
        throw error;
    }
};

/**
 * Récupère les 5 derniers coups de cœur (livres marqués coupDeCoeur=true),
 * triés par date de création décroissante.
 * Utilisé sur la page d'accueil pour mettre en avant les sélections de l'équipe.
 */
export const getLastFiveFavoriteBooks = async (): Promise<BookDocument[]> => {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where("coupDeCoeur", "==", true),
            orderBy("creation_date", "desc"),
            limit(5),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des coups de cœur:", error);
        throw error;
    }
};
