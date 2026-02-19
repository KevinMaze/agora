import { FormsType } from "@/types/form";
import { Typo } from "@/ui/design-system/typography";
import { AddConcertForm } from "./components/add-concert-form";
import { AddConcertList } from "./components/add-concert-list";
import { GalleryImages } from "./components/add-gallery-form";

interface Props {
    form: FormsType;
    imagePreviews: string[];
    setImagePreviews: (value: string[]) => void;
}

export const AddConcertAdminAccountView = ({
    form,
    imagePreviews,
    setImagePreviews,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Ici vous pouvez ajouter des concerts pour la Gazette.
            </Typo>
            <AddConcertForm
                form={form}
                imagePreviews={imagePreviews}
                setImagePreviews={setImagePreviews}
            />
            <AddConcertList />
            <GalleryImages />
        </div>
    );
};
