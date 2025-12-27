"use client";
import { useState, useEffect } from "react";
import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
import { Spinner } from "@/ui/design-system/spinner";
import { RecipeModal, RecipeData } from "./recipe-modal.view";
import recipe from "@/config/locales/carte";

interface RecipeProps {
    initialFilter?: "classic-carte" | "moment" | "winters-drink";
}

export const Recipe: React.FC<RecipeProps> = ({
    initialFilter = "classic-carte",
}) => {
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedRecipes, setDisplayedRecipes] = useState<RecipeData[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(
        null
    );

    // Simule la récupération des données et le filtrage avec un délai
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const filtered = recipe.filter(
                (recipe) => recipe.type === activeFilter
            );
            setDisplayedRecipes(filtered);
            setIsLoading(false);
        }, 500); // Délai de 500ms pour simuler le chargement

        return () => clearTimeout(timer); // Nettoyage du timer
    }, [activeFilter]); // Se déclenche au changement de filtre

    const handleCardClick = (recipe: RecipeData) => {
        setSelectedRecipe(recipe);
    };

    return (
        <Container className="mb-20 sm:mb-60 lg:mb-60">
            <div className="flex justify-center items-center">
                <Typo
                    variant="para"
                    components="h2"
                    weight={
                        activeFilter === "classic-carte" ? "bold" : "normal"
                    }
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-2xl lg:text-3xl cursor-pointer hover:text-tier",
                        activeFilter === "classic-carte" && "underline"
                    )}
                    onClick={() => setActiveFilter("classic-carte")}
                >
                    Carte classique
                </Typo>
                <Typo
                    variant="para"
                    components="h2"
                    weight="normal"
                    className="mb-25 sm:mb-30 lg:mb-40 m-5 sm:m-15 lg:m-20 text-2xl sm:text-4xl lg:text-4xl text-primary"
                >
                    /
                </Typo>
                <Typo
                    variant="para"
                    components="h2"
                    weight={activeFilter === "moment" ? "bold" : "normal"}
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-2xl lg:text-3xl cursor-pointer hover:text-tier",
                        activeFilter === "moment" && "underline"
                    )}
                    onClick={() => setActiveFilter("moment")}
                >
                    Gourmandises du moment
                </Typo>
                <Typo
                    variant="para"
                    components="h2"
                    weight="normal"
                    className="mb-25 sm:mb-30 lg:mb-40 m-5 sm:m-15 lg:m-20 text-2xl sm:text-4xl lg:text-4xl text-primary"
                >
                    /
                </Typo>
                <Typo
                    variant="para"
                    components="h2"
                    weight={activeFilter === "moment" ? "bold" : "normal"}
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-2xl lg:text-3xl cursor-pointer hover:text-tier",
                        activeFilter === "moment" && "underline"
                    )}
                    onClick={() => setActiveFilter("winters-drink")}
                >
                    Boissons d'hiver
                </Typo>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {displayedRecipes.map((recipe, index) => (
                        <CardRecipe
                            key={index}
                            {...recipe}
                            onClick={() => handleCardClick(recipe)}
                        />
                    ))}
                </div>
            )}
            {selectedRecipe && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
            <div className="p-auto m-auto text-center">
                <Typo
                    variant="para"
                    components="p"
                    color="secondary"
                    weight="bold"
                >
                    Supplément lait végétal: 0.50 € / chantilly - topping: 1 €
                </Typo>
            </div>
        </Container>
    );
};
