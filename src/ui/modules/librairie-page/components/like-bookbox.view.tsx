import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image, { StaticImageData } from "next/image";
import React, { useMemo } from "react";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut
import Dune from "@/../public/assets/images/dune.jpg";
import { Button } from "@/ui/design-system/button";
import { BiArrowFromLeft } from "react-icons/bi";
import { BsArrowBarLeft, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Avatar } from "@/ui/design-system/avatar";

interface LikeBookBoxViewProps {
    title?: string;
    src?: string | StaticImageData;
    alt?: string;
    publicationDate?: string;
    author?: string;
    synopsis?: string;
}

interface StarRatingProps {
    rating: number;
    className?: string;
}

export const LikeBookBoxView: React.FC<LikeBookBoxViewProps> = ({
    title,
    src = DefaultImage,
    alt,
    publicationDate,
    author,
    synopsis,
}) => {
    // --- Simulation de la récupération et du calcul de la note ---
    const ratings: number[] = [0, 4, 0, 3, 4, 0, 2]; // Notes récupérées de la BDD

    const averageRating = useMemo(() => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        return sum / ratings.length;
    }, [ratings]);
    // -------------------------------------------------------------

    const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <span
                        key={`full-${index}`}
                        className="text-yellow-400 text-3xl"
                    >
                        &#9733;
                    </span> // Étoile pleine
                ))}
                {halfStar && (
                    <span className="text-yellow-400 text-3xl">&#9733;</span> // Pour la simplicité, une étoile pleine pour 0.5 ou plus
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <span
                        key={`empty-${index}`}
                        className="text-other text-3xl"
                    >
                        &#9734;
                    </span> // Étoile vide
                ))}
                <Typo variant="para" color="other" className="ml-2 text-lg">
                    ({ratings.length} votes)
                </Typo>
            </div>
        );
    };

    return (
        <>
            <Container className="py-20 border-b-2 border-primary ">
                <Typo
                    variant="title"
                    components="h2"
                    weight="bold"
                    color="primary"
                    className="mb-10 uppercase text-4xl text-end"
                >
                    Coup de coeur de la boite aux livres
                </Typo>
                <div className="p-10 bg-foreground mx-auto h-full rounded-lg shadow-lg max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full overflow-y-auto">
                        {/* Colonne de l'image */}
                        <div className="relative border-2 border-primary rounded-lg">
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
                                    className="text-xl"
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
                                    className="uppercase text-3xl underline "
                                >
                                    Titre
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
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
                                    className="mb-2 uppercase text-3xl underline"
                                >
                                    Date de parution
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
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
                                    className="mb-2 uppercase text-3xl underline"
                                >
                                    Auteur
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
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
                                    className="mb-2 uppercase text-3xl underline"
                                >
                                    Synopsis
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
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
                    <div className="mt-10 flex justify-end">
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

            <Container className="py-20 border-b-2 border-primary ">
                <Typo
                    variant="title"
                    components="h2"
                    weight="bold"
                    color="primary"
                    className="mb-10 uppercase text-4xl text-end"
                >
                    Derniers avis des lecteurs
                </Typo>
                <div className="p-10 bg-foreground mx-auto h-full rounded-lg shadow-lg max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full overflow-y-auto">
                        {/* Colonne de l'image */}

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
                                    Nom / pseudo
                                </Typo>
                                <div className="flex items-center gap-4 mt-2">
                                    <Typo
                                        variant="para"
                                        color="other"
                                        className="mt-2 text-xl"
                                    >
                                        Jean Dupont
                                    </Typo>
                                    <Avatar
                                        size="small"
                                        src={DefaultImage}
                                        alt="Avatar de Jean Dupont"
                                    />
                                </div>
                            </div>

                            <div>
                                <Typo
                                    variant="title"
                                    components="h2"
                                    weight="bold"
                                    color="primary"
                                    className="mb-2 uppercase text-3xl underline"
                                >
                                    Date de publication
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
                                >
                                    2025-01-15
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
                                    Nome du livre
                                </Typo>
                                <Typo
                                    variant="para"
                                    color="other"
                                    className="mt-2 text-xl"
                                >
                                    Dune
                                </Typo>
                            </div>
                        </div>
                        <div className=" space-y-5 flex flex-col">
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="mb-2 uppercase text-3xl underline"
                            >
                                Avis
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-xl"
                            >
                                Un chef-d&#39;œuvre de la science-fiction qui
                                explore des thèmes profonds tels que la
                                politique, la religion et l&#39;écologie.
                                L&#39;univers richement détaillé et les
                                personnages complexes rendent la lecture
                                captivante du début à la fin.
                            </Typo>
                        </div>
                    </div>
                </div>
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
