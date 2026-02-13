import { db } from "@/config/firebase-config";
import { BoxDocument } from "@/types/box";
import { collection, getDocs } from "firebase/firestore";

const BOXES_COLLECTION = "boxes";

export const getBoxes = async (): Promise<BoxDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, BOXES_COLLECTION));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as BoxDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des box: ", error);
        throw error;
    }
};
