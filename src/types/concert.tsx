export interface ConcertDocument {
    id?: string;
    title?: string;
    date?: string;
    description?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    images?: string[];
    image?: string | null;
    userId?: string;
    creation_date?: unknown;
}
