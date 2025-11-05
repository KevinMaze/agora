import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Dune from "@/../public/assets/images/dune.jpg";

export const LikeBookBoxView = () => {
    return (
        <Container className="py-30 border-b-2 border-primary">
            <div className="p-10 rounded-xl w-[900px] bg-foreground mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
                    {/* Colonne de l'image */}
                    <div className="relative h-80 md:h-[500px] w-full border-2 border-primary rounded-lg">
                        <Image
                            src={Dune}
                            alt=""
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* Colonne des détails */}
                    <div className="space-y-5 flex flex-col items-center">
                        <div>
                            <Typo
                                variant="title"
                                components="h2"
                                weight="bold"
                                color="primary"
                                className="uppercase text-3xl underline "
                            >
                                Title
                            </Typo>
                            <Typo
                                variant="para"
                                color="other"
                                className="mt-2 text-center text-xl"
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
                                className="mt-2 text-center text-xl"
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
                                className="mt-2 text-center text-xl"
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
                                className="mt-2 text-center text-xl"
                            >
                                Set in the distant future amidst a huge
                                interstellar empire, Dune tells the story of
                                young Paul Atreides, whose noble family is
                                entrusted with the stewardship of the desert
                                planet Arrakis. As the only source of the
                                universe's most valuable substance, "spice"
                                melange, control of Arrakis is a coveted and
                                dangerous honor. The novel explores themes of
                                politics, religion, and ecology as Paul
                                navigates a complex web of intrigue and betrayal
                                to fulfill his destiny.
                            </Typo>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
