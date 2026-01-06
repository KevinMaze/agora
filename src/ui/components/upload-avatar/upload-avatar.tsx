import { Avatar } from "@/ui/design-system/avatar";
import { RiCamera2Fill } from "react-icons/ri";
import Camera from "@/../public/assets/images/camera.png";

interface Props {
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string | ArrayBuffer | null;
}

export const UploadAvatar = ({ handleImageSelect, imagePreview }: Props) => {
    return (
        <div className="flex items-center gap-5 ">
            <label className="inline-block bg-primary hover:bg-secondary text-background rounded-2xl px-[15px] py-[10px] text-xl font-medium animated">
                <div className="flex items-center gap-2 cursor-pointer">
                    <RiCamera2Fill />
                    <span>Choisir fichier</span>
                </div>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleImageSelect}
                />
            </label>
            <Avatar
                size="very-large"
                alt="Avatar de l'utilisateur"
                src={
                    imagePreview
                        ? typeof imagePreview === "string"
                            ? imagePreview
                            : String(imagePreview)
                        : Camera
                }
            />
        </div>
    );
};

// episode 28 58:14 mettre carte bleu
