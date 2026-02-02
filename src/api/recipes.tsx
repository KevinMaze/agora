import { db } from "@/config/firebase-config";
import { RecipeDocument } from "@/types/recipe";
import { collection, getDocs } from "firebase/firestore";

const RECIPES_COLLECTION = "recipes";

/**
 * Récupère tous les documents de livres de la collection Firestore.
 * @returns Une promesse qui se résout avec un tableau de BookDocuments.
 */
export const getRecipes = async (): Promise<RecipeDocument[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, RECIPES_COLLECTION));
        const recipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as RecipeDocument[];
        return recipes;
    } catch (error) {
        console.error("Erreur lors de la récupération des documents: ", error);
        throw error;
    }
};
