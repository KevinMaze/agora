import { Avatar } from "@/ui/design-system/avatar";
import { RiCamera2Fill } from "react-icons/ri";
import Camera from "@/../public/assets/images/camera.png";
import clsx from "clsx";
import { useAuth } from "@/context/AuthUserContext";

interface Props {
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string | ArrayBuffer | null;
    uploadProgress: number;
    isLoading: boolean;
}

export const UploadAvatar = ({
    handleImageSelect,
    imagePreview,
    isLoading,
    uploadProgress,
}: Props) => {
    const { authUser } = useAuth();

    const uploadProgressBarStyle = `fixed top-0 left-0 w-full h-1 bg-secondary animate ${uploadProgress > 0 ? "" : "hidden"}`;

    return (
        <div className="flex items-center gap-5 ">
            <div
                className={uploadProgressBarStyle}
                style={{ width: `${uploadProgress}%` }}
            ></div>
            <label
                className={clsx(
                    isLoading ? "cursor-not-allowed" : "cursor-pointer",
                    "inline-block bg-primary hover:bg-secondary text-background rounded-2xl px-[15px] py-[10px] text-xl font-medium animated",
                )}
            >
                <div className="flex items-center gap-2 ">
                    <RiCamera2Fill />
                    <span>Choisir fichier</span>
                </div>
                <input
                    type="file"
                    disabled={isLoading}
                    className="hidden"
                    onChange={handleImageSelect}
                />
            </label>
            <Avatar
                size="very-large"
                alt="Avatar de l'utilisateur"
                isLoading={isLoading}
                progress={uploadProgress}
                src={
                    imagePreview
                        ? typeof imagePreview === "string"
                            ? imagePreview
                            : String(imagePreview)
                        : authUser.userDocument.photoURL
                          ? authUser.userDocument.photoURL
                          : Camera
                }
            />
        </div>
    );
};
