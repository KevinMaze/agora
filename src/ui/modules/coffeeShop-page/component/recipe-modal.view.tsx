"use client";
import { StaticImageData } from "next/image";
import { RecipeDocument } from "@/types/recipe";
import { Modal } from "@/ui/design-system/modal";

export type RecipeData = RecipeDocument & {
    src?: string | StaticImageData | null;
    alt: string;
};
interface RecipeModalProps {
    recipe: RecipeData;
    onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
    recipe,
    onClose,
}) => {
    const ingredientsContent = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients;
    const allergenesContent = Array.isArray(recipe.allergènes)
        ? recipe.allergènes.join(", ")
        : recipe.allergènes;

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title={recipe.title}
            image={{
                src: recipe.image || "/assets/images/404.png",
                alt: recipe.title,
            }}
            sections={[
                ...(ingredientsContent
                    ? [
                          {
                              label: "Ingrédients",
                              content: ingredientsContent,
                          },
                      ]
                    : []),
                {
                    label: "Description",
                    content: recipe.description,
                },
                ...(allergenesContent
                    ? [
                          {
                              label: "Allergènes",
                              content: allergenesContent,
                          },
                      ]
                    : []),
            ]}
        />
    );
};
