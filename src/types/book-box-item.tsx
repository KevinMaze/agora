export interface BookBoxItemDocument {
    id?: string;
    uid?: string;
    title: string;
    author: string;
    description: string;
    image: string | null;
    status: "available" | "reserved";
    reservedBy?: { userId: string; displayName: string } | null;
    userId?: string;
    creation_date?: Date;
}
