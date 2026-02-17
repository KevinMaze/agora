"use client";
import { useState, useEffect, useMemo } from "react";
import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";
import { RecipeModal } from "./recipe-modal.view";
import { getRecipes } from "@/api/recipes";
import { RecipeDocument } from "@/types/recipe";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

export const Recipe = () => {
    const [activeFilter, setActiveFilter] = useState();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [Recipes, setRecipes] = useState<RecipeDocument[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [displayedRecipes, setDisplayedRecipes] = useState<RecipeDocument[]>(
        [],
    );
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDocument | null>(
        null,
    );

    // Récupère toutes les recettes au montage du composant
    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const recipesFromDb = await getRecipes();
                const formattedRecipes = recipesFromDb.map((recipe) => {
                    return {
                        ...recipe,
                        src: recipe.image || "",
                        alt: recipe.title,
                        categorie: recipe.categorie,
                        type: recipe.type,
                        price: recipe.price,
                        description: recipe.description,
                        ingredients: recipe.ingredients,
                        allergènes: recipe.allergènes,
                        image: recipe.image,
                        title: recipe.title,
                        uid: recipe.uid,
                        temperature: recipe.temperature,
                    };
                });
                setRecipes(recipesFromDb);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des recettes:",
                    error,
                );
                toast.error("Erreur lors de la récupération des recettes.");
                setRecipes([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    // Fonction pour extraire les catégories uniques
    const categories = [
        ...new Set(Recipes.map((recipe) => recipe.categorie)),
    ].filter(Boolean);

    // Met à jour les recettes affichées en fonction des filtres
    useEffect(() => {
        let filteredRecipes = Recipes;

        if (selectedCategories.length > 0) {
            filteredRecipes = filteredRecipes.filter(
                (recipe) =>
                    recipe.categorie &&
                    selectedCategories.includes(recipe.categorie),
            );
        }

        setDisplayedRecipes(filteredRecipes);
    }, [activeFilter, Recipes, selectedCategories]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category); // Déselectionner
            } else {
                return [...prev, category]; // Sélectionner
            }
        });
    };

    const handleCardClick = (recipe: RecipeDocument) => {
        setSelectedRecipe(recipe);
    };

    return (
        <Container className="mb-20 sm:mb-60 lg:mb-60">
            <div id="filtre" className="relative mb-8 z-20 mt-8">
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
                        Filtres des recettes
                    </Typo>
                    <FaChevronDown
                        className={clsx(
                            "transition-transform cursor-pointer text-primary",
                            isFilterVisible && "rotate-180",
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
                                {categories.map((categorie) => (
                                    <button
                                        key={categorie}
                                        type="button"
                                        onClick={() =>
                                            handleCategoryClick(categorie)
                                        }
                                        className={clsx(
                                            "w-full text-left p-2 rounded border-2 transition-colors",
                                            selectedCategories.includes(
                                                categorie,
                                            )
                                                ? "bg-primary text-background border-primary"
                                                : "bg-background text-primary border-primary hover:bg-foreground/30",
                                        )}
                                    >
                                        {categorie}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {selectedCategories.length > 0 && (
                            <div className="mt-4 flex justify-end">
                                <div
                                    onClick={() => setSelectedCategories([])}
                                    className="text-sm hover:underline cursor-pointer text-primary"
                                >
                                    Réinitialiser les filtres
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {displayedRecipes.map((recipe) => (
                        <CardRecipe
                            key={recipe.uid}
                            uid={recipe.uid}
                            alt={recipe.title}
                            src={recipe.image || ""}
                            image={recipe.image}
                            title={recipe.title}
                            description={recipe.description}
                            price={recipe.price}
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
