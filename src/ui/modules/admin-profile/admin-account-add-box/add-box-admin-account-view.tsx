import { FormsType } from "@/types/form";
import { Typo } from "@/ui/design-system/typography";
import { AddBoxForm } from "./components/add-box-form";
import { AddBoxList } from "./components/add-box-list";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddBoxAdminAccountView = ({
    form,
    imagePreview,
    setImagePreview,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Depuis votre espace personnel, vous pouvez ajouter des box
                click and collect.
            </Typo>
            <AddBoxForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
            <AddBoxList />
        </div>
    );
};
