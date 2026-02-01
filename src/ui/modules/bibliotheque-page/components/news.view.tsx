import { Card } from "@/ui/design-system/card";
import Error from "@/../public/assets/images/404.png";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import { useEffect, useState } from "react";
import { BookDocument } from "@/types/book";
import { getLastTenBooks } from "@/api/books";
import { Spinner } from "@/ui/design-system/spinner";

export const News = () => {
    const [books, setBooks] = useState<BookDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getLastTenBooks();
            setBooks(data);
            setIsLoading(false);
        };
        fetchBooks();
    }, []);

    return (
        <Container>
            <Typo
                variant="para"
                components="h2"
                weight="bold"
                className="mb-20 mt-20 uppercase text-3xl sm:text-5xl lg:text-6xl underline underline-offset-8 text-center"
            >
                Nouveautées
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
                            src={book.image}
                            title={book.title}
                            autor={book.autor}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};
