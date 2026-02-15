import { FormsType } from "@/types/form";
import { AddMomentForm } from "./components/add-moment-form";
import { Typo } from "@/ui/design-system/typography";
import { AddMomentList } from "./components/add-moment-list";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddMomentAdminAccountView = ({
    form,
    imagePreview,
    setImagePreview,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Bienvenue dans votre espace personnel. Ici vous pouvez ajouter
                la boisson ou la gourmandise du moment.
            </Typo>
            <AddMomentForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
            <AddMomentList />
        </div>
    );
};
