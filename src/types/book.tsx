import { StaticImageData } from "next/image";
import { Timestamp } from "firebase/firestore";

export interface BookInterface {
    uid: number;
    title: string;
    autor: string;
    description: string;
    image: StaticImageData;
    bookDocument?: BookDocument;
}

export interface BookDocument {
    uid: string;
    title: string;
    autor: string;
    description: string;
    image: string;
    releaseYear: string | Timestamp;
    category: string;
    nb_page: string;
    like: number;
}
