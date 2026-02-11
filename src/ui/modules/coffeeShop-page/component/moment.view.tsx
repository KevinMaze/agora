"use client";

import Image from "next/image";
import Book from "@/../public/assets/images/book.png";
import Crack from "@/../public/assets/images/déchiré.png";
import Coffee from "@/../public/assets/images/coffee.jpg";
import { useEffect, useState } from "react";
import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";
import { getLatestMoment } from "@/api/moments";
import { toast } from "react-toastify";

interface MomentData {
    title: string;
    image: string;
    ingredients: string[];
    description: string;
}

const DEFAULT_MOMENT_TITLE = "Suggestion du moment";

const getDefaultMomentData = (): MomentData => ({
    title: DEFAULT_MOMENT_TITLE,
    image: Coffee.src,
    ingredients: [],
    description: "",
});

const normalizeIngredients = (value?: string[] | string): string[] => {
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
};

export const Moment = () => {
    const [momentData, setMomentData] = useState<MomentData>(
        getDefaultMomentData(),
    );
    const [hasMomentData, setHasMomentData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMoment = async () => {
            setIsLoading(true);
            try {
                const latestMoment = await getLatestMoment();
                if (!latestMoment) {
                    setHasMomentData(false);
                    setMomentData(getDefaultMomentData());
                    return;
                }

                setHasMomentData(true);
                setMomentData({
                    title: latestMoment.title || DEFAULT_MOMENT_TITLE,
                    image: latestMoment.image || Coffee.src,
                    ingredients: normalizeIngredients(latestMoment.ingredients),
                    description: latestMoment.description || "",
                });
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération du moment:",
                    error,
                );
                toast.error("Impossible de charger le moment.");
                setHasMomentData(false);
                setMomentData(getDefaultMomentData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoment();
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
                className="absolute inset-0 opacity-20 h-270"
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
                    className="absolute w-full h-60 object-cover -top-9 sm:top-0 lg:top-0"
                />
                <div className="flex flex-col justify-center items-center">
                    <Typo
                        variant="title"
                        component="h2"
                        weight="bold"
                        className="uppercase text-2xl sm:text-4xl lg:text-5xl mb-10 underline"
                        color="secondary"
                    >
                        Suggestion du moment
                    </Typo>
                    {isLoading ? (
                        <Spinner variant="white" size="large" />
                    ) : !hasMomentData ? (
                        <Typo
                            variant="para"
                            component="p"
                            weight="bold"
                            className="text-center text-lg sm:text-2xl lg:text-3xl mt-6"
                            color="other"
                        >
                            La suggestion arrive bientôt
                        </Typo>
                    ) : (
                        <div className="flex flex-col justify-center items-center max-w-6xl mx-auto mt-8 px-4">
                            <Typo
                                variant="title"
                                component="h2"
                                weight="bold"
                                className="uppercase text-xl sm:text-3xl lg:text-4xl mb-6 text-center"
                                color="primary"
                            >
                                {momentData.title}
                            </Typo>
                            <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-8 w-full">
                                <div className="w-full md:w-1/3">
                                    <Typo
                                        variant="para"
                                        component="h2"
                                        weight="bold"
                                        className="mb-4 text-center uppercase text-[14px] sm:text-xl lg:text-2xl underline"
                                        color="secondary"
                                    >
                                        Image
                                    </Typo>
                                    <div className="relative w-full h-64 sm:h-72 rounded-lg overflow-hidden border-2 border-secondary/40">
                                        <Image
                                            src={momentData.image || Coffee.src}
                                            alt={momentData.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3">
                                    <Typo
                                        variant="para"
                                        component="h2"
                                        weight="bold"
                                        className="mb-4 text-center uppercase text-[14px] sm:text-xl lg:text-2xl underline"
                                        color="secondary"
                                    >
                                        Ingrédients
                                    </Typo>
                                    <ul className="list-disc list-inside text-left space-y-2">
                                        {momentData.ingredients.length ? (
                                            momentData.ingredients.map(
                                                (ingredient, index) => (
                                                    <Typo
                                                        key={index}
                                                        variant="para"
                                                        component="li"
                                                        color="other"
                                                        className="text-[12px] sm:text-[14px] lg:text-xl"
                                                    >
                                                        {ingredient}
                                                    </Typo>
                                                ),
                                            )
                                        ) : (
                                            <Typo
                                                variant="para"
                                                component="li"
                                                color="other"
                                                className="text-[12px] sm:text-[14px] lg:text-xl"
                                            >
                                                Aucun ingrédient renseigné.
                                            </Typo>
                                        )}
                                    </ul>
                                </div>

                                <div className="w-full md:w-1/3">
                                    <Typo
                                        variant="para"
                                        component="h2"
                                        weight="bold"
                                        className="mb-4 text-center uppercase text-[14px] sm:text-xl lg:text-2xl underline"
                                        color="secondary"
                                    >
                                        Description
                                    </Typo>
                                    <Typo
                                        variant="para"
                                        component="p"
                                        weight="normal"
                                        className="text-justify text-[12px] sm:text-[14px] lg:text-xl"
                                        color="other"
                                    >
                                        {momentData.description ||
                                            "Aucune description disponible."}
                                    </Typo>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Image
                src={Crack}
                alt=""
                className="absolute -bottom-20 sm:bottom-0 lg:bottom-0 w-full h-100 object-cover rotate-180"
            />
        </div>
    );
};
