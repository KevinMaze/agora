export interface BoxDocument {
    id?: string;
    uid?: string;
    title: string;
    description: string;
    type: string;
    price: string;
    image: string | null;
    userId?: string;
    creation_date?: Date;
}
