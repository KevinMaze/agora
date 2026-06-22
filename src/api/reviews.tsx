/**
 * API avis (reviews) — lecture Firestore pour la collection "bookReviews".
 *
 * Les avis passent par un système de modération (moderationStatus: "pending" | "approved" | "rejected").
 * La lecture est libre, la modération se fait depuis l'espace admin.
 */
import { db } from "@/config/firebase-config";
import { ReviewDocument } from "@/types/review";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

const REVIEWS_COLLECTION = "bookReviews";

/**
 * Récupère tous les avis de la plateforme, triés du plus récent au plus ancien.
 * Utilisé dans l'espace admin pour la modération.
 */
export const getBookReviews = async (): Promise<ReviewDocument[]> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            orderBy("creation_date", "desc"),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as ReviewDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        throw error;
    }
};

/**
 * Récupère tous les avis associés à un livre précis, triés du plus récent au plus ancien.
 * Utilisé dans la modal de détail d'un livre pour afficher les avis des lecteurs.
 * @param bookId - L'ID Firestore du livre
 */
export const getBookReviewsByBookId = async (
    bookId: string,
): Promise<ReviewDocument[]> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("bookId", "==", bookId),
            orderBy("creation_date", "desc"),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as ReviewDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des avis pour ce livre:", error);
        throw error;
    }
};

/**
 * Récupère les derniers avis approuvés, triés du plus récent au plus ancien.
 * Utilisé dans la page librairie pour le carrousel "Derniers avis des lecteurs".
 * @param count - Nombre d'avis à retourner (défaut: 3)
 */
export const getLastApprovedReviews = async (count = 3): Promise<ReviewDocument[]> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("moderationStatus", "==", "approved"),
            orderBy("creation_date", "desc"),
            limit(count),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as ReviewDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des derniers avis approuvés:", error);
        throw error;
    }
};

/**
 * Récupère l'avis qu'un utilisateur précis a laissé sur un livre précis.
 * Retourne null si l'utilisateur n'a pas encore donné d'avis sur ce livre.
 * Utilisé dans ModalAvis pour pré-remplir le formulaire si l'avis existe déjà.
 * @param userId - L'UID Firebase de l'utilisateur
 * @param bookId - L'ID Firestore du livre
 */
export const getUserBookReview = async (
    userId: string,
    bookId: string,
): Promise<ReviewDocument | null> => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("userId", "==", userId),
            where("bookId", "==", bookId),
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        } as unknown as ReviewDocument;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'avis utilisateur:", error);
        throw error;
    }
};
