import { Typo } from "@/ui/design-system/typography";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
}
export const AddBookAdminAccountContainer = ({ form }: Props) => {
    const { register, errors, isLoading } = form;

    return (
        <div className="flex justify-center pt-20 pb-40">
            <Typo variant="para" components="p">
                Bienvenue dans votre espace personnel. Ici vous pouvez ajouter
                des livres dans votre bibliothèque.
            </Typo>

            <form className="w-full max-w-md space-y-4">
                <Input
                    label="Title"
                    isLoading={isLoading}
                    placeholder="Titre du livre"
                    type="text"
                    register={register}
                    errors={errors}
                    errorMsg="Tu dois renseigner un titre"
                    id="title"
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
                    required={false}
                />
                <Input
                    label="Catégorie"
                    isLoading={isLoading}
                    placeholder="Catégorie"
                    type="text"
                    register={register}
                    errors={errors}
                    errorMsg="Donne-nous la catégorie du livre"
                    id="category"
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
                />
            </form>
        </div>
    );
};
