"use client";
import { useState, useEffect } from "react";
import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import Coffee from "@/../public/assets/images/coffee.png";
import Cake from "@/../public/assets/images/cake.jpg";
import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
import { Spinner } from "@/ui/design-system/spinner";

interface RecipeProps {
    initialFilter?: "coffee" | "cake";
}

export const Recipe: React.FC<RecipeProps> = ({ initialFilter = "coffee" }) => {
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedRecipes, setDisplayedRecipes] = useState<any[]>([]);
    // Données de recettes complètes (simulant la BDD)
    const allRecipes = [
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

    return (
        <Container className="mb-80">
            <div className="flex justify-center items-center">
                <Typo
                    variant="para"
                    components="h2"
                    weight={activeFilter === "coffee" ? "bold" : "normal"}
                    className={clsx(
                        "mt-20 mb-20 uppercase tracking-widest text-4xl cursor-pointer",
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
                    className="m-20 text-4xl text-primary"
                >
                    /
                </Typo>
                <Typo
                    variant="para"
                    components="h2"
                    weight={activeFilter === "cake" ? "bold" : "normal"}
                    className={clsx(
                        "mt-20 mb-20 uppercase tracking-widest text-4xl cursor-pointer",
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
                            image={recipe.src}
                            alt={recipe.alt}
                            title={recipe.title}
                            description={recipe.description}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};
