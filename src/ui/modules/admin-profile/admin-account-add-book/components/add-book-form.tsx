import { FormsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";

interface Props {
    form: FormsType;
}

export const AddBookForm = ({ form }: Props) => {
    const { register, errors, isLoading, handleSubmit, onSubmit } = form;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
        >
            <Input
                label="Title"
                isLoading={isLoading}
                placeholder="Titre du livre"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un titre"
                id="title"
                required={true}
            />
            <Input
                label="Auteur"
                isLoading={isLoading}
                placeholder="Auteur"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un auteur"
                id="autor"
                required={true}
            />

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description"
                register={register}
                errors={errors}
                errorMsg="Décris un peu le livre ou entre le synopsis"
                id="description"
                required={true}
            />
            <Input
                label="Catégorie"
                isLoading={isLoading}
                placeholder="Catégorie"
                type="checkbox"
                register={register}
                errors={errors}
                errorMsg="Donne-nous la catégorie du livre"
                id="category"
                options={[
                    { value: "Triller", label: "Triller" },
                    { value: "Romance", label: "Romance" },
                    { value: "Action", label: "Action" },
                    { value: "Aventure", label: "Aventure" },
                    { value: "Science-fiction", label: "Science-fiction" },
                    { value: "Classique", label: "Classique" },
                    { value: "Policier", label: "Policier" },
                    { value: "Historique", label: "Historique" },
                    { value: "Fantastique", label: "Fantastique" },
                    { value: "Drame", label: "Drame" },
                    { value: "Horreur", label: "Horreur" },
                ]}
                required={true}
            />
            <Input
                label="Année de sortie"
                isLoading={isLoading}
                placeholder="Année de sortie"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Entre l'année de sortie"
                id="releaseYear"
                required={true}
            />

            <Button isLoading={isLoading} type="submit">
                {isLoading ? "Loading..." : "Ajouter le livre"}
            </Button>
        </form>
    );
};
