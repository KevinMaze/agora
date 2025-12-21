import { Timestamp } from "firebase/firestore";

export interface UserInterface {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean;
    photoURL: string | null;
    phoneNumber: string | null;
    userDocument?: UserDocument;
}

export interface UserDocument {
    uid: string;
    username: string;
    bio: string;
    pseudo: string;
    creation_date: Timestamp;
    avatar: string;
    onboardingIsCompleted: boolean;
}
