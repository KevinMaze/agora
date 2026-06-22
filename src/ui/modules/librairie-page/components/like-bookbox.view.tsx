import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import DefaultImage from "@/../public/assets/images/404.png";
import Dune from "@/../public/assets/images/dune.jpg";
import { Button } from "@/ui/design-system/button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Avatar } from "@/ui/design-system/avatar";
import { StarRating } from "@/ui/design-system/star-rating";
import { Spinner } from "@/ui/design-system/spinner";
import { getLastApprovedReviews } from "@/api/reviews";
import { ReviewDocument } from "@/types/review";
import { Timestamp } from "firebase/firestore";

interface LikeBookBoxViewProps {
    title?: string;
    src?: string | StaticImageData;
    alt?: string;
    publicationDate?: string;
    author?: string;
    synopsis?: string;
}

export const LikeBookBoxView: React.FC<LikeBookBoxViewProps> = ({
    title,
    src = DefaultImage,
    alt,
    publicationDate,
    author,
    synopsis,
}) => {
    const staticRatings = useMemo(() => [0, 4, 0, 3, 4, 0, 2], []);
    const averageRating = useMemo(() => {
        if (staticRatings.length === 0) return 0;
        return (
            staticRatings.reduce((acc, r) => acc + r, 0) / staticRatings.length
        );
    }, [staticRatings]);

    const [reviews, setReviews] = useState<ReviewDocument[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getLastApprovedReviews(3)
            .then(setReviews)
            .catch(() => setReviews([]))
            .finally(() => setIsLoadingReviews(false));
    }, []);

    const formatDate = (date: ReviewDocument["creation_date"]): string => {
        if (!date) return "—";
        if (date instanceof Timestamp)
            return date.toDate().toLocaleDateString("fr-FR");
        return new Date(date as string | Date).toLocaleDateString("fr-FR");
    };

    const prev = () =>
        setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);
    const next = () => setCurrentIndex((i) => (i + 1) % reviews.length);

    return (
        <>
            <Container className="py-20">
                <Typo
                    variant="title"
                    components="h2"
                    weight="bold"
                    color="primary"
                    className="mb-10 uppercase text-[14px] sm:text-3xl lg:text-4xl text-center sm:text-end"
                >
                    Coup de coeur de la boite aux livres
                </Typo>
                <div className="p-10 bg-foreground mx-auto h-full rounded-lg shadow-lg max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full overflow-y-auto">
                        {/* Colonne de l'image */}
                        <div className="relative rounded-lg">
                            <Image
                                src={Dune}
                                alt={alt || "Book Cover"}
                                className="rounded-lg object-cover w-full h-full "
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-foreground/80 px-4 py-2 rounded-md">
                                <Typo
                                    variant="para"
                                    components="p"
                                    weight="bold"
                                    color="primary"
                                    className="sm:text-xl sm:text-center"
                                >
                                    Note des lecteurs :
                                </Typo>
                                <StarRating rating={averageRating} />
                            </div>
                        </div>
                        {/* Colonne des détails */}
                        <div className="space-y-5 flex flex-col">
                            <div>
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="uppercase text-xl sm:text-2xl lg:text-3xl underline "
                                >
                                    Titre
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2  lg:text-xl"
                                >
                                    Dune
                                </Typo>
                            </div>

                            <div>
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                >
                                    Date de parution
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2  lg:text-xl"
                                >
                                    1965
                                </Typo>
                            </div>

                            <div>
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                >
                                    Auteur
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2  lg:text-xl"
                                >
                                    Frank Herbert
                                </Typo>
                            </div>
                            <div>
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                >
                                    Synopsis
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2  lg:text-xl"
                                >
                                    Set in the distant future amidst a huge
                                    interstellar empire, Dune tells the story of
                                    young Paul Atreides, whose noble family
                                    accepts the stewardship of the desert planet
                                    Arrakis. While the planet is an inhospitable
                                    and sparsely populated world, it is the only
                                    source of melange, or &quot;the spice&quot;,
                                    a drug that extends life and enhances mental
                                    abilities. As melange is the most valuable
                                    substance in the universe, control of
                                    Arrakis is a coveted and dangerous
                                    undertaking.
                                </Typo>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center sm:justify-end">
                        <Button
                            variant="primary"
                            size="large"
                            icon={{ icon: BsArrowRight }}
                            iconPosition="left"
                            action={() => {
                                console.log("Emprunter le livre");
                            }}
                        >
                            Emprunter
                        </Button>
                    </div>
                </div>
            </Container>

            <Container className="py-20 border-b-2 border-primary">
                <Typo
                    variant="title"
                    components="h2"
                    weight="bold"
                    color="primary"
                    className="mb-10 uppercase text-[14px] sm:text-3xl lg:text-4xl text-center sm:text-end"
                >
                    Derniers avis des lecteurs
                </Typo>

                {isLoadingReviews ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner size="large" />
                    </div>
                ) : reviews.length === 0 ? (
                    <Typo variant="para" color="other" className="text-center">
                        Aucun avis disponible pour le moment.
                    </Typo>
                ) : (
                    <div className="p-10 bg-foreground mx-auto rounded-lg shadow-lg max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                            {/* Colonne gauche : auteur + méta */}
                            <div className="space-y-5 flex flex-col">
                                <div>
                                    <Typo
                                        variant="title"
                                        components="h2"
                                        weight="bold"
                                        color="primary"
                                        className="uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                    >
                                        Nom / pseudo
                                    </Typo>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Typo
                                            variant="para"
                                            color="other"
                                            className="lg:text-xl"
                                        >
                                            {reviews[currentIndex].pseudo ||
                                                `${reviews[currentIndex].firstName ?? ""} ${reviews[currentIndex].lastName ?? ""}`.trim() ||
                                                "Lecteur anonyme"}
                                        </Typo>
                                        <Avatar
                                            size="very-large"
                                            src={
                                                reviews[currentIndex].avatar ||
                                                DefaultImage
                                            }
                                            alt="Avatar du lecteur"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Typo
                                        variant="title"
                                        components="h2"
                                        weight="bold"
                                        color="primary"
                                        className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                    >
                                        Note
                                    </Typo>
                                    <StarRating
                                        rating={reviews[currentIndex].rating}
                                        size="medium"
                                    />
                                </div>

                                <div>
                                    <Typo
                                        variant="title"
                                        components="h2"
                                        weight="bold"
                                        color="primary"
                                        className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                    >
                                        Date de publication
                                    </Typo>
                                    <Typo
                                        variant="para"
                                        color="other"
                                        className="mt-2 lg:text-xl"
                                    >
                                        {formatDate(
                                            reviews[currentIndex].creation_date,
                                        )}
                                    </Typo>
                                </div>

                                <div>
                                    <Typo
                                        variant="title"
                                        components="h2"
                                        weight="bold"
                                        color="primary"
                                        className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                    >
                                        Livre
                                    </Typo>
                                    <Typo
                                        variant="para"
                                        color="other"
                                        className="mt-2 lg:text-xl"
                                    >
                                        {reviews[currentIndex].bookTitle}
                                    </Typo>
                                </div>
                            </div>

                            {/* Colonne droite : texte de l'avis */}
                            <div className="space-y-5 flex flex-col">
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="mb-2 uppercase text-xl sm:text-2xl lg:text-3xl underline"
                                >
                                    Avis
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 lg:text-xl"
                                >
                                    {reviews[currentIndex].review}
                                </Typo>
                            </div>
                        </div>

                        {/* Navigation carrousel */}
                        {reviews.length > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-6">
                                <button
                                    onClick={prev}
                                    className="p-2 text-primary hover:text-secondary transition-colors"
                                    aria-label="Avis précédent"
                                >
                                    <BsArrowLeft size={28} />
                                </button>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="text-sm"
                                >
                                    {currentIndex + 1} / {reviews.length}
                                </Typo>
                                <button
                                    onClick={next}
                                    className="p-2 text-primary hover:text-secondary transition-colors"
                                    aria-label="Avis suivant"
                                >
                                    <BsArrowRight size={28} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </>

        // <div>
        //     <Typo variant="para" color="other" className="mt-5 text-center">
        //         * Les livres empruntés via la boîte aux livres sont à
        //         retourner dans un délai de 30 jours.
        //     </Typo>
        // </div>
    );
};
