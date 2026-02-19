import { storage } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
