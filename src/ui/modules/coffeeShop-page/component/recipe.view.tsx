"use client";
import { useState, useEffect, useMemo } from "react";
import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";
import { RecipeModal } from "./recipe-modal.view";
import { getRecipes } from "@/api/recipes";
import { RecipeDocument } from "@/types/recipe";
import { Button } from "@/ui/design-system/button";

export const Recipe = () => {
    const [activeFilter, setActiveFilter] = useState();
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
                setRecipes(recipesFromDb);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des recettes:",
                    error,
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    // Fonction pour extraire les catégories uniques
    const availableCategories = useMemo(() => {
        const categories = Recipes.map((recipe) => recipe.categorie).filter(
            Boolean,
        );
        return [...new Set(categories)];
    }, [Recipes]);

    // Met à jour les recettes affichées en fonction des filtres
    useEffect(() => {
        let filteredRecipes = Recipes.filter(
            (recipe) => recipe.type === activeFilter,
        );

        if (selectedCategories.length > 0) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                selectedCategories.includes(recipe.categorie),
            );
        }

        // Map RecipeDocument to RecipeData for the view components
        const recipesForView = filteredRecipes.map((doc) => ({
            ...doc,
            src: doc.image || "", // Gérer l'image par défaut dans CardRecipe
            alt: doc.title,
        }));

        setDisplayedRecipes(recipesForView);
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
            {/* Filtre par catégorie */}
            <div className="flex justify-center items-center gap-4 my-8 flex-wrap">
                <Typo variant="para" weight="bold" color="secondary">
                    Catégories :
                </Typo>
                {availableCategories.map((category) => (
                    <Button
                        key={category}
                        size="large"
                        variant={
                            selectedCategories.includes(category)
                                ? "primary"
                                : "disabled"
                        }
                        action={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Button>
                ))}
                {selectedCategories.length > 0 && (
                    <Button
                        variant="danger"
                        size="small"
                        action={() => setSelectedCategories([])}
                    >
                        Réinitialiser
                    </Button>
                )}
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {Recipes.map((recipe) => (
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
