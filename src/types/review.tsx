import { Timestamp } from "firebase/firestore";

export interface ReviewDocument {
    id?: string;
    bookId: string;
    bookTitle: string;
    bookImage: string | null;
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    pseudo: string | null;
    avatar: string;
    rating: number;
    review: string;
    moderationStatus: "pending" | "approved" | "rejected";
    creation_date?: Timestamp | string | Date | null;
    updated_date?: Timestamp | string | Date | null;
}
