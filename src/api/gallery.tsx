import { db } from "@/config/firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export type GalleryDocument = {
    id?: string;
    image?: string | null;
    userId?: string;
    creation_date?: unknown;
};

const GALLERY_COLLECTION = "gallery";

export const getGalleryImages = async (): Promise<GalleryDocument[]> => {
    try {
        const q = query(
            collection(db, GALLERY_COLLECTION),
            orderBy("creation_date", "desc"),
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as GalleryDocument[];
    } catch (error) {
        console.error("Erreur lors de la recuperation de la galerie:", error);
        throw error;
    }
};
