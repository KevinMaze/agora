"use client";

import Image from "next/image";
import Heart from "@/../public/assets/images/heart.png";
import Crack from "@/../public/assets/images/déchiré.png";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "@/ui/design-system/card";
import Error from "@/../public/assets/images/404.png";
import { getLastFiveFavoriteBooks } from "@/api/books";
import { BookDocument } from "@/types/book";
import { useEffect, useState } from "react";
import { Spinner } from "@/ui/design-system/spinner";
import { Container } from "@/ui/components/container";
import { Modal } from "@/ui/design-system/modal";

export const Like = () => {
    const [books, setBooks] = useState<BookDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<BookDocument | null>(null);

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            setIsLoading(true);
            try {
                const data = await getLastFiveFavoriteBooks();
                setBooks(data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des coups de coeur:",
                    error,
                );
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteBooks();
    }, []);

    return (
        <div className="mt-50">
            <div className="relative w-full h-150 overflow-hidden">
                <Image
                    src={Crack}
                    alt="Effet déchiré"
                    className="absolute -top-10 sm:top-0 lg:top-0 w-full h-60 object-cover z-10"
                />
                <div className="absolute opacity-60 inset-0">
                    <Image
                        src={Heart}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                    />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        className="text-3xl sm:text-6xl lg:text-7xl uppercase"
                    >
                        Nos coups de coeur
                    </Typo>
                </div>
            </div>

            <Container className="mt-40">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="large" />
                    </div>
                ) : books.length === 0 ? (
                    <Typo
                        variant="para"
                        component="p"
                        className="text-center text-xl"
                    >
                        Aucun coup de coeur pour le moment.
                    </Typo>
                ) : (
                    <div className="flex flex-wrap justify-center gap-10">
                        {books.map((book, index) => (
                            <Card
                                key={book.id || book.uid || index}
                                src={book.image || Error}
                                alt={book.title}
                                title={book.title}
                                autor={book.autor}
                                onAction={() => setSelectedBook(book)}
                            />
                        ))}
                    </div>
                )}
            </Container>

            <Modal
                isOpen={!!selectedBook}
                onClose={() => setSelectedBook(null)}
                title={selectedBook?.title}
                image={{
                    src: selectedBook?.image || Error,
                    alt: selectedBook?.title || "Livre",
                }}
                sections={[
                    ...(selectedBook?.autor
                        ? [
                              {
                                  label: "Auteur",
                                  content: selectedBook.autor,
                              },
                          ]
                        : []),
                    ...(selectedBook?.releaseYear
                        ? [
                              {
                                  label: "Année",
                                  content: selectedBook.releaseYear,
                              },
                          ]
                        : []),
                    ...(selectedBook?.category
                        ? [
                              {
                                  label: "Catégorie",
                                  content: selectedBook.category,
                              },
                          ]
                        : []),
                    {
                        label: "Description",
                        content:
                            selectedBook?.description ||
                            "Aucune description disponible.",
                    },
                ]}
            />
        </div>
    );
};
