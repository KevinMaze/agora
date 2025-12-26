"use client";
import { useState, useEffect } from "react";
import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import Coffee from "@/../public/assets/images/coffee.png";
import Cake from "@/../public/assets/images/cake.jpg";
import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
import { Spinner } from "@/ui/design-system/spinner";
import { RecipeModal, RecipeData } from "./recipe-modal.view";
import classicCarte from "@/config/locales/carte";

interface RecipeProps {
    initialFilter?: "beverage" | "cake";
}

export const Recipe: React.FC<RecipeProps> = ({
    initialFilter = "beverage",
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
            const filtered = classicCarte.filter(
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
                    weight={activeFilter === "beverage" ? "bold" : "normal"}
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-3xl lg:text-4xl cursor-pointer hover:text-tier",
                        activeFilter === "beverage" && "underline"
                    )}
                    onClick={() => setActiveFilter("beverage")}
                >
                    Nos Boissons
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
                    weight={activeFilter === "cake" ? "bold" : "normal"}
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-3xl lg:text-4xl cursor-pointer hover:text-tier",
                        activeFilter === "cake" && "underline"
                    )}
                    onClick={() => setActiveFilter("cake")}
                >
                    Nos Gourmandises
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
