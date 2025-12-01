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

interface RecipeProps {
    initialFilter?: "coffee" | "cake";
}

export const Recipe: React.FC<RecipeProps> = ({ initialFilter = "coffee" }) => {
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedRecipes, setDisplayedRecipes] = useState<RecipeData[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(
        null
    );
    // Données de recettes complètes (simulant la BDD)
    const allRecipes = [
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
            ingredients: ["Espresso", "Lait entier", "Mousse de lait"],
            history:
                "Le café latte est une boisson chaude originaire d'Italie, où il est traditionnellement consommé au petit-déjeuner. Son nom signifie littéralement 'café au lait'.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Café Latte",
            type: "coffee",
            description:
                "Un délicieux café latte avec une mousse de lait crémeuse.",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Cappuccino",
            description: "Un cappuccino riche avec une belle mousse de lait.",
            type: "coffee",
        },
        {
            src: Coffee,
            alt: "Recette de café",
            title: "Espresso",
            description: "Un espresso corsé avec une crema parfaite.",
            type: "coffee",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Cheesecake",
            description:
                "Un cheesecake crémeux avec un coulis de fruits rouges.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Tarte au Citron",
            description:
                "Une tarte au citron acidulée avec une meringue légère.",
            type: "cake",
        },
        {
            src: Cake,
            alt: "Recette de gâteau",
            title: "Brownie",
            description: "Un brownie fondant au chocolat avec des noix.",
            type: "cake",
        },
    ];

    // Simule la récupération des données et le filtrage avec un délai
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const filtered = allRecipes.filter(
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
                    weight={activeFilter === "coffee" ? "bold" : "normal"}
                    className={clsx(
                        "mb-20 uppercase text-[14px] sm:text-3xl lg:text-4xl cursor-pointer hover:text-tier",
                        activeFilter === "coffee" && "underline"
                    )}
                    onClick={() => setActiveFilter("coffee")}
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
        </Container>
    );
};
