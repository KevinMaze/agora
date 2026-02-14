import { db } from "@/config/firebase-config";
import { EvenementDocument } from "@/types/evenement";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const EVENEMENTS_COLLECTION = "evenements";

export const getEvenements = async (): Promise<EvenementDocument[]> => {
    try {
        const q = query(
            collection(db, EVENEMENTS_COLLECTION),
            orderBy("date", "asc"),
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as EvenementDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        throw error;
    }
};
