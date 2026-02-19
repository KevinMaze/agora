import { db } from "@/config/firebase-config";
import { ConcertDocument } from "@/types/concert";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const CONCERTS_COLLECTION = "concerts";

export const getConcerts = async (): Promise<ConcertDocument[]> => {
    try {
        const q = query(collection(db, CONCERTS_COLLECTION), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as ConcertDocument[];
    } catch (error) {
        console.error("Erreur lors de la recuperation des concerts:", error);
        throw error;
    }
};
