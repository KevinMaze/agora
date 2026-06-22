/**
 * API Storage Firebase — upload et suppression de fichiers.
 *
 * Utilisé principalement pour les images : avatars utilisateurs,
 * couvertures de livres, visuels d'événements et de concerts.
 */
import { storage } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Uploade un fichier dans Firebase Storage et retourne son URL de téléchargement.
 * Le chemin `path` doit inclure le nom du fichier (ex: "books/mon-livre.jpg").
 * @param path - Chemin de destination dans le bucket Storage
 * @param file - Fichier à uploader (sélectionné via un <input type="file">)
 * @returns L'URL publique du fichier uploadé, ou une erreur en cas d'échec
 */
export const storageUploadFile = async (path: string, file: File) => {
    try {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return { data: url };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};

/**
 * Supprime un fichier de Firebase Storage à partir de son URL complète de téléchargement.
 * Utilisé lors de la suppression d'un livre ou d'un avatar pour libérer l'espace.
 * @param fileUrl - URL complète du fichier dans Firebase Storage
 */
export const storageDeleteFileByUrl = async (fileUrl: string) => {
    try {
        const storageRef = ref(storage, fileUrl);
        await deleteObject(storageRef);
        return { data: true, error: null };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            data: null,
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};
