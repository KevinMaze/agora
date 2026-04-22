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
    review: string;
    moderationStatus: "pending" | "approved" | "rejected";
    creation_date?: { toDate?: () => Date } | string | Date | null;
    updated_date?: { toDate?: () => Date } | string | Date | null;
}
