import { Timestamp } from "firebase/firestore";

export interface UserInterface {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoURL: string | null;
    userDocument?: UserDocument;
}

export interface UserDocument {
    uid: string;
    displayName: string;
    pseudo: string;
    creation_date: Timestamp;
    avatar: string;
    onboardingIsCompleted: boolean;
    description: string;
    hobbies: string;
    styleLove: string;
}
