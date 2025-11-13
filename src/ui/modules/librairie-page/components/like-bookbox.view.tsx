import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image, { StaticImageData } from "next/image";

interface LikeBookBoxViewProps {
    className?: string;
    book: {
        title: string;
        src: StaticImageData;
        alt: string;
        publicationDate: string;
        author: string;
        synopsis: string;
    };
}

export const LikeBookBoxView = ({ className, book }: LikeBookBoxViewProps) => {
    return (
        <Container className={className}>
            <div className="p-10 rounded-xl bg-foreground mx-auto h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full overflow-y-auto">
                    {/* Colonne de l'image */}
                    <div className="relative h-80 md:h-[500px] w-full border-2 border-primary rounded-lg">
                        <Image
                            src={book.src}
                            alt={book.alt}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* Colonne des détails */}
                    <div className="space-y-5 flex flex-col">
                        <div>
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="uppercase text-3xl underline "
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-xl"
                            >
                                {book.title}
                            </Typo>
                        </div>

                        <div>
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="mb-2 uppercase text-3xl underline"
                            >
                                Date de parution
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-xl"
                            >
                                {book.publicationDate}
                            </Typo>
                        </div>

                        <div>
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="mb-2 uppercase text-3xl underline"
                            >
                                Auteur
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-xl"
                            >
                                {book.author}
                            </Typo>
                        </div>
                        <div>
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="mb-2 uppercase text-3xl underline"
                            >
                                Synopsis
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-xl"
                            >
                                {book.synopsis}
                            </Typo>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
