import { db } from "@/config/firebase-config";
import { ReviewDocument } from "@/types/review";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const REVIEWS_COLLECTION = "bookReviews";

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
        console.error(
            "Erreur lors de la récupération des avis pour ce livre:",
            error,
        );
        throw error;
    }
};
