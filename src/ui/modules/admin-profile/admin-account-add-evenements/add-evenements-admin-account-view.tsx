import { FormsType } from "@/types/form";
import { Typo } from "@/ui/design-system/typography";
import { AddEvenementsForm } from "./components/add-evenements-form";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddEvenementsAdminAccountView = ({
    form,
    imagePreview,
    setImagePreview,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Ici vous pouvez ajouter des événements pour la Gazette.
            </Typo>
            <AddEvenementsForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
        </div>
    );
};
