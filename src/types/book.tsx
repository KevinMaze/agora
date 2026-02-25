export interface BookInterface {
    uid: number;
    title: string;
    autor: string;
    description: string;
    image: string | null;
    coupDeCoeur?: boolean;
    bookDocument?: BookDocument;
}

export interface BookDocument {
    id?: string;
    uid: string;
    title: string;
    autor: string;
    description: string;
    image: string | null;
    releaseYear: string;
    category: string;
    nb_page: string;
    like: number;
    coupDeCoeur?: boolean;
}
