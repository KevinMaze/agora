import { db } from "@/config/firebase-config";
import { MomentDocument } from "@/types/moment";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const MOMENTS_COLLECTION = "moments";

export const getMoments = async (): Promise<MomentDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, MOMENTS_COLLECTION));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as MomentDocument[];
    } catch (error) {
        console.error("Erreur lors de la récupération des moments:", error);
        throw error;
    }
};

export const getLatestMoment = async (): Promise<MomentDocument | null> => {
    try {
        const q = query(
            collection(db, MOMENTS_COLLECTION),
            orderBy("creation_date", "desc"),
            limit(1),
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const latestMoment = querySnapshot.docs[0];
        return {
            id: latestMoment.id,
            ...latestMoment.data(),
        } as unknown as MomentDocument;
    } catch (error) {
        console.error("Erreur lors de la récupération du moment :", error);
        throw error;
    }
};
