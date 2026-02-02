"use client";

import { Typo } from "@/ui/design-system/typography";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

// Définir un type plus complet pour les données de la recette
export interface RecipeDocument {
    uid: string;
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string[];
    allergènes: string[];
    price: string;
    image: string | null;
}

interface RecipeModalProps {
    recipe: RecipeDocument;
    onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
    recipe,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-background p-10 rounded-xl w-[900px] h-[600px] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-primary hover:text-secondary"
                    aria-label="Fermer la modale"
                >
                    <FaTimes size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
                    {/* Colonne de l'image */}
                    <div className="relative h-80 md:h-[500px] w-full">
                        <Image
                            src={recipe.image || ""}
                            alt={recipe.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* Colonne des détails */}
                    <div className="space-y-5 flex flex-col items-center text-center">
                        <Typo
                            variant="title"
                            components="h2"
                            weight="bold"
                            color="primary"
                            className="uppercase text-3xl underline "
                        >
                            {recipe.title}
                        </Typo>

                        {recipe.ingredients && (
                            <div>
                                <Typo
                                    variant="para"
                                    weight="bold"
                                    color="secondary"
                                    className="mb-2 uppercase "
                                >
                                    Ingrédients
                                </Typo>

                                {recipe.ingredients}
                            </div>
                        )}

                        <div>
                            <Typo
                                variant="para"
                                weight="bold"
                                color="secondary"
                                className="mb-2 uppercase "
                            >
                                Description
                            </Typo>
                            <Typo variant="para" color="other">
                                {recipe.description}
                            </Typo>
                        </div>
                        {recipe.allergènes && (
                            <div>
                                <Typo
                                    variant="para"
                                    weight="bold"
                                    color="secondary"
                                    className="mb-2 uppercase "
                                >
                                    Allergènes
                                </Typo>
                                <Typo variant="para" color="other">
                                    {recipe.allergènes}
                                </Typo>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
