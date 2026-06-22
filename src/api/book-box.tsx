import { db } from "@/config/firebase-config";
import { BookBoxItemDocument } from "@/types/book-box-item";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const BOOK_BOX_COLLECTION = "bookBox";

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
