import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export const firebaseCreateUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { data: userCredential.user };
    } catch (error) {
        return {
            error: {
                code: (error as { code: string }).code,
                message: (error as { message: string }).message,
            },
        };
    }
};
