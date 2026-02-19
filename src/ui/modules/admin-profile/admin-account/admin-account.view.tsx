import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { CardAdmin } from "./components/card-admin";
import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    uploadProgress: number;
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdminAccountView = ({
    form,
    imagePreview,
    uploadProgress,
    handleImageSelect,
}: Props) => {
    return (
        <div className="grid">
            <div className="flex justify-center pt-20 pb-20">
                <Typo variant="title" components="h1" className="text-2xl">
                    Bienvenue dans votre espace personnel.
                </Typo>
            </div>
            <Container className="sm">
                <Typo variant="para" components="p" className="text-center">
                    Ma carte utilisateur
                </Typo>
                <CardAdmin
                    imagePreview={imagePreview}
                    uploadProgress={uploadProgress}
                    handleImageSelect={handleImageSelect}
                    form={form}
                />
            </Container>
        </div>
    );
};
