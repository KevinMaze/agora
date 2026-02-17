"use client";

import { BoxDocument } from "@/types/box";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import ErrorImage from "@/../public/assets/images/404.png";
import { useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

type CollectBox = BoxDocument & {
    id?: string;
};

interface Props {
    boxes: CollectBox[];
    isLoading: boolean;
}

const BOX_TYPES = [
    { value: "all", label: "Toutes" },
    { value: "standard", label: "Standard" },
    { value: "standard occasion", label: "Standard occasion" },
    { value: "xxl", label: "XXL" },
];

const normalizeText = (value?: string | null) =>
    (value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

const getCanonicalType = (value?: string | null) => {
    const normalized = normalizeText(value);
    if (normalized.includes("xxl")) return "xxl";
    if (normalized.includes("occasion")) return "standard occasion";
    if (normalized.includes("standard")) return "standard";
    return normalized;
};

export const SoldCollect = ({ boxes, isLoading }: Props) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedBox, setSelectedBox] = useState<CollectBox | null>(null);

    const filteredBoxes = useMemo(() => {
        if (selectedType === "all") return boxes;
        return boxes.filter(
            (box) => getCanonicalType(box.type) === selectedType,
        );
    }, [boxes, selectedType]);

    return (
        <Container className="mb-20 sm:mt-50 -mt-180 flex flex-col items-center">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="uppercase underline sm:text-end sm:mr-10 text-center text-2xl sm:text-4xl lg:text-6xl mb-20"
            >
                Les Box du moments
            </Typo>
            <div className="z-1 bg-foreground/80 p-5 rounded-3xl lg:w-[900px] text-center">
                <Typo
                    variant="para"
                    weight="normal"
                    className="text-secondary uppercase underline sm:text-xl"
                >
                    Choisis ton format :
                </Typo>

                <Typo
                    variant="para"
                    components="p"
                    weight="normal"
                    className="text-center m-5 sm:text-xl"
                    color="other"
                >
                    Pour chaque genre proposé dans les box, deux formats sont
                    disponibles : un standard et un XXL. Ces box s’adaptent à
                    vos budgets et à vos envies !
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        Standard :
                    </Typo>
                    - Un livre de poche neuf - Goodies - Pochette livres.
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        Standard d’occasion :
                    </Typo>
                    - 3 livres d’occasion - Goodies - Un café suspendu (offert).
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        XXL :
                    </Typo>
                    - Un livre grand format neuf et un livre petit format neuf -
                    Un textile (écharpe, t-shirt, tote bag). - Un goodies - Un
                    coupon -20% dans le magasin.
                    <br />
                    <br />
                    Pour tout premier achat de box, vous avez{" "}
                    <span className="text-tier">20 points offerts</span> sur
                    votre compte fidélité.
                </Typo>
            </div>

            <Container className="w-full max-w-5xl mt-10 mb-8">
                <div id="filtre" className="relative mb-8 z-20">
                    <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className={clsx(
                            "flex items-center justify-between w-full p-4 bg-foreground/80 backdrop-blur-sm rounded-t-lg border-2 border-primary",
                            isFilterVisible
                                ? "rounded-b-none border-b-0"
                                : "rounded-b-lg",
                        )}
                    >
                        <Typo
                            variant="para"
                            component="p"
                            weight="bold"
                            className="underline"
                        >
                            Filtres des box
                        </Typo>
                        <FaChevronDown
                            className={clsx(
                                "transition-transform cursor-pointer",
                                isFilterVisible && "rotate-180",
                                "text-primary",
                            )}
                        />
                    </button>
                    <div
                        className={clsx(
                            "absolute w-full origin-top transform-gpu transition-[opacity,transform] duration-200 ease-out will-change-transform",
                            {
                                "opacity-100 translate-y-0 border-2 border-primary border-t-0":
                                    isFilterVisible,
                                "opacity-0 -translate-y-1 pointer-events-none":
                                    !isFilterVisible,
                            },
                        )}
                    >
                        <div className="p-4 bg-foreground/80 backdrop-blur-sm rounded-b-lg text-white">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                    {BOX_TYPES.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() =>
                                                setSelectedType(type.value)
                                            }
                                            className={clsx(
                                                "w-full text-left p-2 rounded border-2 transition-colors",
                                                selectedType === type.value
                                                    ? "bg-primary text-background border-primary"
                                                    : "bg-background text-primary border-primary hover:bg-foreground/30",
                                            )}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <div
                                    onClick={() => setSelectedType("all")}
                                    className="text-sm hover:underline cursor-pointer text-primary"
                                >
                                    Reinitialiser les filtres
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {isLoading ? (
                <div className="my-12">
                    <Spinner size="large" />
                </div>
            ) : (
                <>
                    {filteredBoxes.length === 0 ? (
                        <Typo
                            variant="para"
                            component="p"
                            className="my-10 text-center"
                        >
                            Aucune box disponible pour ce filtre.
                        </Typo>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                            {filteredBoxes.map((box, index) => (
                                <Card
                                    key={box.id || index}
                                    src={box.image || ErrorImage}
                                    title={box.title}
                                    description={box.description}
                                    price={box.price}
                                    onAction={() => setSelectedBox(box)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <Modal
                isOpen={!!selectedBox}
                onClose={() => setSelectedBox(null)}
                title={selectedBox?.title}
                image={{
                    src: selectedBox?.image || ErrorImage,
                    alt: selectedBox?.title || "Box",
                }}
                sections={[
                    ...(selectedBox?.type
                        ? [
                              {
                                  label: "Type",
                                  content: selectedBox.type,
                              },
                          ]
                        : []),
                    ...(selectedBox?.price
                        ? [
                              {
                                  label: "Prix",
                                  content: `${selectedBox.price}€`,
                              },
                          ]
                        : []),
                    {
                        label: "Description",
                        content:
                            selectedBox?.description ||
                            "Aucune description disponible.",
                    },
                ]}
            />
        </Container>
    );
};
