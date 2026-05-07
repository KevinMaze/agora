import { firestoreDeleteDocument, firestoreDeleteDocumentsByQuery } from "./firestore";
import { storageDeleteFileByUrl } from "./storage";

interface DeleteBookResult {
    data: {
        bookDeleted: boolean;
        imageDeleted: boolean;
        reviewsDeleted: number;
    } | null;
    error: {
        code: string;
        message: string;
        step: string;
    } | null;
}

/**
 * Supprime un livre et toutes les données associées en cascade :
 * - Le document du livre
 * - L'image du livre du Storage Firebase
 * - Tous les avis/reviews du livre
 *
 * @param bookId - L'ID du livre à supprimer
 * @param bookImage - L'URL complète de l'image du livre (optionnelle)
 * @returns Résultat de la suppression avec détails
 */
export const deleteBookWithRelations = async (
    bookId: string,
    bookImage?: string | null,
): Promise<DeleteBookResult> => {
    try {
        // ÉTAPE 1 : Supprimer l'image du Storage (si elle existe)
        let imageDeleted = false;
        if (bookImage) {
            const { error: storageDeleteError } = await storageDeleteFileByUrl(
                bookImage,
            );

            // Ignorer l'erreur si l'image n'existe pas
            if (
                storageDeleteError &&
                storageDeleteError.code !== "storage/object-not-found"
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

        // ÉTAPE 2 : Supprimer tous les avis/reviews du livre
        const { data: reviewsData, error: reviewsError } =
            await firestoreDeleteDocumentsByQuery("bookReviews", "bookId", bookId);

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

        // ÉTAPE 3 : Supprimer le livre lui-même
        const { error: bookDeleteError } = await firestoreDeleteDocument(
            "books",
            bookId,
        );

        if (bookDeleteError) {
            return {
                data: null,
                error: {
                    code: bookDeleteError.code,
                    message: bookDeleteError.message,
                    step: "book_deletion",
                },
            };
        }

        return {
            data: {
                bookDeleted: true,
                imageDeleted,
                reviewsDeleted,
            },
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: {
                code: "unknown_error",
                message: error instanceof Error ? error.message : "Erreur inconnue",
                step: "unknown",
            },
        };
    }
};
