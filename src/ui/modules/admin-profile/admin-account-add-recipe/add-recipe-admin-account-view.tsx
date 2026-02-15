import { FormsType } from "@/types/form";
import { AddRecipeForm } from "./components/add-recipe-form";
import { Typo } from "@/ui/design-system/typography";
import { AddRecipeList } from "./components/add-recipe-list";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddRecipeAdminAccountView = ({
    form,
    imagePreview,
    setImagePreview,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Bienvenue dans votre espace personnel. Ici vous pouvez ajouter
                des recettes dans votre carte.
            </Typo>
            <AddRecipeForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
            <AddRecipeList />
        </div>
    );
};
