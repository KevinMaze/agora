import { db } from "@/config/firebase-config";
import { getBookRatings } from "@/api/reviews";
import {
    firestoreDeleteDocument,
    firestoreDeleteDocumentsByQuery,
} from "@/api/firestore";
import { storageDeleteFileByUrl } from "@/api/storage";
import { BookBoxItemDocument } from "@/types/book-box-item";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const BOOK_BOX_COLLECTION = "bookBox";

interface DeleteBookBoxItemResult {
    data: {
        itemDeleted: boolean;
        imageDeleted: boolean;
        reviewsDeleted: number;
    } | null;
    error: {
        code: string;
        message: string;
        step: string;
    } | null;
}

export const getBookBoxItems = async (): Promise<BookBoxItemDocument[]> => {
    try {
        const q = query(
            collection(db, BOOK_BOX_COLLECTION),
            orderBy("creation_date", "desc"),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookBoxItemDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des livres de la boîte:", error);
        throw error;
    }
};

export const getAvailableBookBoxItems = async (): Promise<BookBoxItemDocument[]> => {
    try {
        const q = query(
            collection(db, BOOK_BOX_COLLECTION),
            where("status", "==", "available"),
            orderBy("creation_date", "desc"),
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BookBoxItemDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des livres disponibles:", error);
        throw error;
    }
};

/**
 * Récupère le livre de la boîte le mieux noté ("coup de coeur").
 * Les avis sont stockés dans la même collection que les avis livres classiques
 * (bookReviews), indexés par l'id du document bookBox comme bookId.
 * getBookRatings() exclut déjà les avis non notés (rating<=0) du calcul de moyenne,
 * donc tout id présent dans `ratings` a nécessairement une moyenne > 0.
 * S'il n'y a aucun avis noté sur aucun livre, retourne null (rien à afficher).
 */
export const getBestBookBoxItem = async (): Promise<{
    item: BookBoxItemDocument;
    averageRating: number;
} | null> => {
    try {
        const items = await getBookBoxItems();
        if (items.length === 0) return null;

        const ratings = await getBookRatings();

        let best: BookBoxItemDocument | null = null;
        let bestRating = 0;

        for (const item of items) {
            const rating = item.id ? ratings[item.id] : undefined;
            if (rating !== undefined && rating > bestRating) {
                best = item;
                bestRating = rating;
            }
        }

        if (!best) return null;

        return { item: best, averageRating: bestRating };
    } catch (error) {
        console.error(
            "Erreur lors de la récupération du meilleur livre de la boîte:",
            error,
        );
        throw error;
    }
};

/**
 * Supprime un livre de la boîte et toutes les données associées en cascade :
 * - L'image du livre dans le Storage Firebase
 * - Tous les avis/reviews laissés sur ce livre (bookReviews, indexés par bookId)
 * - Le document du livre lui-même (avec l'uid de l'ajouteur, le statut, reservedBy...)
 *
 * @param itemId - L'ID du document bookBox à supprimer
 * @param itemImage - L'URL complète de l'image du livre (optionnelle)
 */
export const deleteBookBoxItemWithRelations = async (
    itemId: string,
    itemImage?: string | null,
): Promise<DeleteBookBoxItemResult> => {
    try {
        let imageDeleted = false;
        if (itemImage) {
            const { error: storageDeleteError } =
                await storageDeleteFileByUrl(itemImage);

            if (
                storageDeleteError &&
                storageDeleteError.code !== "storage/object-not-found" &&
                storageDeleteError.code !== "storage/invalid-url"
            ) {
                return {
                    data: null,
                    error: {
                        code: storageDeleteError.code,
                        message: storageDeleteError.message,
                        step: "image_deletion",
                    },
                };
            }
            imageDeleted = true;
        }

        const { data: reviewsData, error: reviewsError } =
            await firestoreDeleteDocumentsByQuery(
                "bookReviews",
                "bookId",
                itemId,
            );

        if (reviewsError) {
            return {
                data: null,
                error: {
                    code: reviewsError.code,
                    message: reviewsError.message,
                    step: "reviews_deletion",
                },
            };
        }

        const reviewsDeleted = reviewsData?.deletedCount || 0;

        const { error: itemDeleteError } = await firestoreDeleteDocument(
            BOOK_BOX_COLLECTION,
            itemId,
        );

        if (itemDeleteError) {
            return {
                data: null,
                error: {
                    code: itemDeleteError.code,
                    message: itemDeleteError.message,
                    step: "item_deletion",
                },
            };
        }

        return {
            data: { itemDeleted: true, imageDeleted, reviewsDeleted },
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: {
                code: "unknown_error",
                message:
                    error instanceof Error ? error.message : "Erreur inconnue",
                step: "unknown",
            },
        };
    }
};
