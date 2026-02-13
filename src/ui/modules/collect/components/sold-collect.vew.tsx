"use client";

import { BoxDocument } from "@/types/box";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import ErrorImage from "@/../public/assets/images/404.png";
import { useMemo, useState } from "react";

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
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedBox, setSelectedBox] = useState<CollectBox | null>(null);

    const filteredBoxes = useMemo(() => {
        if (selectedType === "all") return boxes;
        return boxes.filter((box) => getCanonicalType(box.type) === selectedType);
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

            <div className="w-full max-w-5xl mt-10 mb-8">
                <label
                    htmlFor="box-type-filter"
                    className="block text-sm font-semibold text-secondary uppercase mb-2"
                >
                    Filtrer par type de box
                </label>
                <select
                    id="box-type-filter"
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    className="w-full sm:w-[340px] px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other"
                >
                    {BOX_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

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
