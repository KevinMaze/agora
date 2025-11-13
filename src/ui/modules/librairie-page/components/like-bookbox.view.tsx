import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image, { StaticImageData } from "next/image";
import React from "react";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut
import Dune from "@/../public/assets/images/dune.jpg";

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
    return (
        <Container className="py-20 border-b-2 border-primary ">
            <div className="p-10 bg-foreground mx-auto h-full rounded-lg shadow-lg max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full overflow-y-auto">
                    {/* Colonne de l'image */}
                    <div className="relative border-2 border-primary rounded-lg">
                        <Image
                            src={Dune}
                            alt={alt ?? "book cover"}
                            className="rounded-lg object-cover w-full h-full "
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
                                young Paul Atreides, whose noble family accepts
                                the stewardship of the desert planet Arrakis.
                                While the planet is an inhospitable and sparsely
                                populated world, it is the only source of
                                melange, or &quot;the spice&quot;, a drug that
                                extends life and enhances mental abilities. As
                                melange is the most valuable substance in the
                                universe, control of Arrakis is a coveted and
                                dangerous undertaking.
                            </Typo>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
