"use client";

import Image from "next/image";
import Book from "@/../public/assets/images/book.png";
import Crack from "@/../public/assets/images/déchiré.png";
import { useEffect, useState } from "react";
import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";

// On définit le type de données que l'on attend
interface MomentData {
    ingredients: string[];
    description: string;
}

export const Moment = () => {
    const [momentData, setMomentData] = useState<MomentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulation de la récupération de données
    useEffect(() => {
        setIsLoading(true);
        // Simule un délai réseau de 1.5 secondes
        setTimeout(() => {
            setMomentData({
                ingredients: [
                    "Café de spécialité",
                    "Lait entier",
                    "Sirop de vanille",
                    "Crème fouettée",
                ],
                description:
                    "Un délicieux latte à la vanille préparé avec notre meilleur café, pour un moment de douceur et de réconfort. Parfait pour accompagner une lecture passionnante.",
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className="absolute inset-0 opacity-30 h-270"
                style={{
                    transform: `translateY(${offsetY * -0.1}px)`,
                }}
            >
                <Image
                    src={Book}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <Image
                    src={Crack}
                    alt=""
                    className="absolute w-full h-60 object-cover top-0"
                />
                <div className="flex flex-col justify-center items-center">
                    <Typo
                        variant="title"
                        components="h2"
                        weight="bold"
                        className="uppercase text-5xl mb-10"
                        color="secondary"
                    >
                        Le café du moment
                    </Typo>
                    {isLoading ? (
                        <Spinner variant="white" size="large" />
                    ) : (
                        <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-16 max-w-4xl mx-auto mt-8 px-4">
                            {/* Colonne des ingrédients */}
                            <div className="w-full md:w-1/3">
                                <Typo
                                    variant="para"
                                    components="h2"
                                    weight="bold"
                                    className="mb-4 text-center uppercase text-2xl"
                                    color="secondary"
                                >
                                    Ingrédients
                                </Typo>
                                <ul className="list-disc list-inside text-left space-y-2">
                                    {momentData?.ingredients.map(
                                        (ingredient, index) => (
                                            <Typo
                                                key={index}
                                                variant="para"
                                                components="li"
                                                color="other"
                                            >
                                                {ingredient}
                                            </Typo>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Colonne de la description */}
                            <div className="w-full md:w-2/3">
                                <Typo
                                    variant="para"
                                    components="h2"
                                    weight="bold"
                                    className="mb-4 text-center uppercase text-2xl"
                                    color="secondary"
                                >
                                    Description
                                </Typo>
                                <Typo
                                    variant="para"
                                    components="p"
                                    weight="normal"
                                    className="text-justify"
                                    color="other"
                                >
                                    {momentData?.description}
                                </Typo>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Image
                src={Crack}
                alt=""
                className="absolute bottom-0 w-full h-100 object-cover rotate-180"
            />
        </div>
    );
};
