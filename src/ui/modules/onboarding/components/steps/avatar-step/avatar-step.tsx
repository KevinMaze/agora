import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Container } from "@/ui/components/container";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typo } from "@/ui/design-system/typography";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { UploadAvatar } from "@/ui/components/upload-avatar/upload-avatar";
import { useState } from "react";
import {
    StorageReference,
    UploadTask,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "@/config/firebase-config";

export const AvatarStep = ({
    nextStep,
    prevStep,
    isFinalStep,
    getCurrentStep,
    stepsList,
}: BaseComponentProps) => {
    const { authUser } = useAuth();

    console.log("test", authUser);
    const { value: isLoading, setValue: setLoading } = useToggle();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    console.log("progress", uploadProgress);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                let imageDataUrl: string | ArrayBuffer | null = null;
                if (event.target) {
                    imageDataUrl = event.target.result;
                }
                setImagePreview(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        let storageRef: StorageReference;
        let uploadTask: UploadTask;

        if (selectedImage !== null) {
            // toggle();
            storageRef = ref(
                storage,
                `users-media/${authUser.uid}/avatar-${authUser.uid}`,
            );
            uploadTask = uploadBytesResumable(storageRef, selectedImage);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.log("error", error);
                    // toggle();
                    toast.error("Erreur lors du téléchargement de l'image");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            console.log("files", downloadURL);
                        },
                    );
                },
            );
        }
    };

    return (
        <div className="relative h-screen pb-[85px]">
            <div className="h-full overflow-auto">
                <Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs
                                tabs={stepsList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typo
                                variant="title"
                                components="h1"
                                className="uppercase text-6xl"
                            >
                                Dernière étape !
                            </Typo>
                            <Typo variant="para" components="p">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Similique ab vitae inventore
                                voluptas laboriosam porro, ad, tenetur placeat
                                esse quasi omnis corporis error minus
                                reprehenderit sint pariatur magni iure tempora?
                            </Typo>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="flex justify-center w-full">
                            <UploadAvatar
                                handleImageSelect={handleImageSelect}
                                imagePreview={imagePreview}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <OnboardingFooter
                nextStep={handleImageUpload}
                prevStep={prevStep}
                isFinalStep={isFinalStep}
                isLoading={isLoading}
            />
        </div>
    );
};
