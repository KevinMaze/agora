import Image from "next/image";
import Biblio from "@/../public/assets/images/biblio.png";
import Crack from "@/../public/assets/images/déchiré.png";
import Dune from "@/../public/assets/images/dune.jpg";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import { Card } from "@/ui/design-system/card";

export const CatalogueView = () => {
    const BookCatalogue = [
        {
            src: Dune,
            alt: "Couverture du livre Dune",
            title: "Dune",
            description: "Un classique de la science-fiction.",
            autor: "Frank Herbert",
        },
        {
            alt: "Couverture du livre Dune 2",
            title: "Dune 2",
            description: "Un classique de la science-fiction. Suite de Dune.",
            autor: "Frank Herbert",
        },
        {
            alt: "Couverture du livre Dune 3",
            title: "Dune 3",
            description:
                "Un classique de la science-fiction. Partie finale de Dune.",
            autor: "Frank Herbert",
        },
    ];

    return (
        <div className="mt-50">
            <div className="relative w-full h-200 overflow-hidden">
                <Image
                    src={Crack}
                    alt="Effet déchiré"
                    className="absolute bottom-0 w-full h-60 object-cover z-10 rotate-180"
                />
                <div className="absolute  inset-0">
                    <Image
                        src={Biblio}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                    />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-around items-center">
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        className="text-8xl uppercase"
                    >
                        Le
                    </Typo>
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        className="text-8xl uppercase"
                    >
                        Cata
                        <Typo
                            variant="para"
                            components="span"
                            weight="bold"
                            className="-rotate-12 inline-block "
                        >
                            l
                        </Typo>
                        ogue
                    </Typo>
                </div>
            </div>

            <Container className="mt-50 mb-50">
                <div className="" id="filtre"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                    {[...BookCatalogue, ...BookCatalogue].map((book, index) => (
                        <Card key={index} {...book} />
                    ))}
                </div>
            </Container>
        </div>
    );
};
