export interface BookBoxItemDocument {
    id?: string;
    uid?: string;
    title: string;
    author: string;
    description: string;
    image: string | null;
    status: "available" | "reserved";
    userId?: string;
    creation_date?: Date;
}
