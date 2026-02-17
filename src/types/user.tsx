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
    name: string;
    email: string;
    uid: string;
    displayName: string;
    creation_date: Timestamp;
    avatar: string;
    onboardingIsCompleted: boolean;
    description: string;
    hobbies: string;
    styleLove: string | string[];
    photoURL: string | null;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    instagram: string;
}
