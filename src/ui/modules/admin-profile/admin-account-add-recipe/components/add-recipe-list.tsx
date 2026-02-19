"use client";

import { firestoreDeleteDocument, firestoreUptadeDocument } from "@/api/firestore";
import { getRecipes } from "@/api/recipes";
import { storageDeleteFileByUrl, storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddRecipeFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddRecipeForm } from "./add-recipe-form";

type RecipeListItem = {
    id: string;
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string | string[];
    allergènes: string | string[];
    price: string;
    image: string | null;
};

const toInputString = (value?: string | string[]) => {
    if (Array.isArray(value)) return value.join(", ");
    return value || "";
};

const toCheckboxArray = (value?: string | string[]) => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
};

export const AddRecipeList = () => {
    const RECIPES_PER_PAGE = 15;
    const { authUser } = useAuth();
    const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeListItem | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm<AddRecipeFormFieldsType>({
        defaultValues: {
            title: "",
            type: "",
            categorie: "café",
            temperature: "chaud",
            description: "",
            ingredients: "",
            allergènes: [],
            price: "",
        },
    });

    const selectedImage = watch("image");
    const hasNewImage = !!selectedImage?.[0];

    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            const data = await getRecipes();
            const normalized = data
                .map((recipe) => ({
                    id: recipe.id || "",
                    title: recipe.title || "",
                    type: recipe.type || "",
                    categorie: recipe.categorie || "",
                    temperature: recipe.temperature || "",
                    description: recipe.description || "",
                    ingredients: recipe.ingredients || "",
                    allergènes: recipe.allergènes || [],
                    price: recipe.price || "",
                    image: recipe.image || null,
                }))
                .filter((recipe) => !!recipe.id) as RecipeListItem[];
            setRecipes(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des recettes:", error);
            toast.error("Impossible de charger les recettes.");
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleOpenEdit = (recipe: RecipeListItem) => {
        setSelectedRecipe(recipe);
        setImagePreview(recipe.image);
        reset({
            title: recipe.title,
            type: recipe.type,
            categorie: recipe.categorie,
            temperature: recipe.temperature,
            description: recipe.description,
            ingredients: toInputString(recipe.ingredients),
            allergènes: toCheckboxArray(recipe.allergènes),
            price: recipe.price,
        });
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddRecipeFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedRecipe) return;
        setIsUpdating(true);

        const { image, ...recipeData } = formData;
        let imageUrl = selectedRecipe.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `recipes/${authUser.displayName}-${imageFile.name}`,
                imageFile,
            );
            if (storageError) {
                setIsUpdating(false);
                toast.error(storageError.message);
                return;
            }
            imageUrl = url || imageUrl;
        }

        const payload = {
            ...recipeData,
            ingredients: toInputString(recipeData.ingredients),
            allergènes: toCheckboxArray(recipeData.allergènes),
            image: imageUrl,
        };

        const { error } = await firestoreUptadeDocument(
            "recipes",
            selectedRecipe.id,
            payload,
        );
        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setRecipes((prev) =>
            prev.map((recipe) =>
                recipe.id === selectedRecipe.id
                    ? { ...recipe, ...(payload as Omit<RecipeListItem, "id">) }
                    : recipe,
            ),
        );
        toast.success("Recette modifiée avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedRecipe) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer cette recette ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        if (selectedRecipe.image) {
            const { error: storageDeleteError } = await storageDeleteFileByUrl(
                selectedRecipe.image,
            );
            if (
                storageDeleteError &&
                storageDeleteError.code !== "storage/object-not-found"
            ) {
                setIsDeleting(false);
                toast.error(
                    `Impossible de supprimer l'image de la recette: ${storageDeleteError.message}`,
                );
                return;
            }
        }

        const { error } = await firestoreDeleteDocument(
            "recipes",
            selectedRecipe.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setRecipes((prev) => prev.filter((recipe) => recipe.id !== selectedRecipe.id));
        toast.success("Recette supprimée.");
        setIsDeleting(false);
        closeModal();
    };

    const isSubmitDisabled = useMemo(
        () => !isDirty && !hasNewImage,
        [isDirty, hasNewImage],
    );

    const normalizedSearchQuery = useMemo(
        () =>
            searchQuery
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim(),
        [searchQuery],
    );

    const filteredRecipes = useMemo(() => {
        if (!normalizedSearchQuery) return recipes;
        return recipes.filter((recipe) =>
            (recipe.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [recipes, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const paginatedRecipes = useMemo(() => {
        const start = (currentPage - 1) * RECIPES_PER_PAGE;
        const end = start + RECIPES_PER_PAGE;
        return filteredRecipes.slice(start, end);
    }, [filteredRecipes, currentPage]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Recettes ajoutées
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher une recette par titre"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredRecipes.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucune recette trouvée pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedRecipes.map((recipe) => (
                            <Card
                                key={recipe.id}
                                src={recipe.image || undefined}
                                title={recipe.title}
                                autor={recipe.type}
                                onAction={() => handleOpenEdit(recipe)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === 1 ? "disabled" : "primary"
                                }
                                disabled={currentPage === 1}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                                icon={{ icon: FaChevronLeft }}
                                iconPosition="left"
                            >
                                Précédent
                            </Button>
                            <Typo variant="para" component="p">
                                Page {currentPage} / {totalPages}
                            </Typo>
                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === totalPages
                                        ? "disabled"
                                        : "primary"
                                }
                                disabled={currentPage === totalPages}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(totalPages, prev + 1),
                                    )
                                }
                                icon={{ icon: FaChevronRight }}
                                iconPosition="right"
                            >
                                Suivant
                            </Button>
                        </div>
                    )}
                </>
            )}

            <Modal
                isOpen={!!selectedRecipe}
                onClose={closeModal}
                title={selectedRecipe?.title || "Modifier la recette"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedRecipe && (
                    <AddRecipeForm
                        form={{
                            errors,
                            register,
                            handleSubmit,
                            onSubmit: onSubmitEdit,
                            isLoading: isUpdating,
                        }}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                        submitLabel="Valider les modifications"
                        isSubmitDisabled={isSubmitDisabled}
                        footer={
                            <Button
                                type="button"
                                variant="danger"
                                action={handleDelete}
                                isLoading={isDeleting}
                            >
                                Supprimer la recette
                            </Button>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
