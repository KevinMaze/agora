export interface MomentDocument {
    id?: string;
    title?: string;
    type?: string;
    categorie?: string;
    temperature?: string;
    description?: string;
    ingredients?: string[] | string;
    allergènes?: string[] | string;
    price?: string;
    image?: string | null;
    userId?: string;
    creation_date?: unknown;
}
