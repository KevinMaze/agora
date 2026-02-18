import { db } from "@/config/firebase-config";
import { UserDocument } from "@/types/user";
import { collection, getDocs } from "firebase/firestore";

const USERS_COLLECTION = "users";

export type UserCollectionDocument = UserDocument & { id: string };

export const getUsers = async (): Promise<UserCollectionDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as UserCollectionDocument[];
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des utilisateurs: ",
            error,
        );
        throw error;
    }
};
