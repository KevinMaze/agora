import Image from "next/image";
import Heart from "@/../public/assets/images/heart.png";
import Crack from "@/../public/assets/images/déchiré.png";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "@/ui/design-system/card";
import Dune from "@/../public/assets/images/dune.jpg";

export const Like = () => {
    const BookLike = [
        {
            src: Dune,
            alt: "Couverture du livre Dune",
            title: "Dune",
            description: "Un classique de la science-fiction.",
            autor: "Frank Herbert",
        },
        {
            src: Dune,
            alt: "Couverture du livre Dune",
            title: "Dune",
            description: "Un classique de la science-fiction.",
            autor: "Frank Herbert",
        },
    ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center mt-40">
                {[...BookLike, ...BookLike].map((book, index) => (
                    <Card key={index} {...book} />
                ))}
            </div>
        </div>
    );
};
