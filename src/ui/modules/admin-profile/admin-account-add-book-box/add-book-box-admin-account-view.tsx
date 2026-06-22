import { FormsType } from "@/types/form";
import { Typo } from "@/ui/design-system/typography";
import { AddBookBoxForm } from "./components/add-book-box-form";
import { AddBookBoxList } from "./components/add-book-box-list";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddBookBoxAdminAccountView = ({ form, imagePreview, setImagePreview }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Depuis cet espace, tu peux ajouter des livres dans la boîte à livres.
            </Typo>
            <AddBookBoxForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
            <AddBookBoxList />
        </div>
    );
};
