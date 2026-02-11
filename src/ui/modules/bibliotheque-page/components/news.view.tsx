import { Card } from "@/ui/design-system/card";
import Error from "@/../public/assets/images/404.png";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import { useEffect, useState } from "react";
import { BookDocument } from "@/types/book";
import { getLastTenBooks } from "@/api/books";
import { Spinner } from "@/ui/design-system/spinner";
import { Modal } from "@/ui/design-system/modal";

export const News = () => {
    const [books, setBooks] = useState<BookDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<BookDocument | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const data = await getLastTenBooks();
                setBooks(data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des nouveautés:",
                    error,
                );
            }
            setIsLoading(false);
        };
        fetchBooks();
    }, []);

    return (
        <Container>
            <Typo
                variant="para"
                component="h2"
                weight="bold"
                className="mb-20 mt-20 uppercase text-3xl sm:text-5xl lg:text-6xl underline underline-offset-8 text-center"
            >
                Nouveautés
            </Typo>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                    {books.map((book) => (
                        <Card
                            key={book.uid}
                            src={book.image || Error}
                            alt={book.title}
                            title={book.title}
                            autor={book.autor}
                            onAction={() => setSelectedBook(book)}
                        />
                    ))}
                </div>
            )}

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
        </Container>
    );
};
