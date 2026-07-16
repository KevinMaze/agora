import { FormsType } from "@/types/form";
import { AddBookForm } from "./components/add-book-form";
import { AddBookList } from "./components/add-book-list";
import { Typo } from "@/ui/design-system/typography";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddBookAdminAccountView = ({
    form,
    imagePreview,
    setImagePreview,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Ici vous pouvez ajouter des livres dans votre bibliothèque.
            </Typo>
            <AddBookForm
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />
            <AddBookList />
        </div>
    );
};
