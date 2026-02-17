import { useAuth } from "@/context/AuthUserContext";
import { AdminAccountView } from "./admin-account.view";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFieldsType } from "@/types/form";
import { useEffect, useState } from "react";
import { firestoreUptadeDocument } from "@/api/firestore";
import { toast } from "react-toastify";
import {
    getDownloadURL,
    ref,
    StorageReference,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";
import { storage } from "@/config/firebase-config";
import { updateUserIdentificationData } from "@/api/authentication";

export const AdminAccountContainer = () => {
    const { authUser, reloadAuthUserData } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToggle();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        setError,
    } = useForm<UserProfileFormFieldsType>();

    const {
        displayName,
        description,
        hobbies,
        styleLove,
        facebook,
        twitter,
        youtube,
        tiktok,
        instagram,
    } = authUser.userDocument;

    useEffect(() => {
        const fieldsToUpdate: (
            | "displayName"
            | "description"
            | "hobbies"
            | "styleLove"
            | "email"
            | "facebook"
            | "twitter"
            | "youtube"
            | "tiktok"
            | "instagram"
        )[] = [
            "displayName",
            "description",
            "email",
            "facebook",
            "hobbies",
            "instagram",
            "styleLove",
            "tiktok",
            "twitter",
            "youtube",
        ];

        for (const field of fieldsToUpdate) {
            setValue(field, authUser.userDocument[field]);
        }
    }, []);

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
            setLoading(true);
            storageRef = ref(
                storage,
                `users-media/${authUser.uid}/avatar/avatar-${authUser.uid}`,
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
                    if (error) {
                        setLoading(false);
                        toast.error("Erreur lors du téléchargement de l'image");
                        setUploadProgress(0);
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            updateUserAvatar(downloadURL);
                            setSelectedImage(null);
                            setTimeout(() => {
                                setUploadProgress(0);
                            }, 1000);
                        },
                    );
                },
            );
        }
    };

    const updateUserAvatar = async (photoURL: string) => {
        const body = { photoURL: photoURL };

        await updateUserIdentificationData(authUser.uid, body);
        const { error } = await firestoreUptadeDocument(
            "users",
            authUser.uid,
            body,
        );
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        reloadAuthUserData();
        setLoading(false);
    };

    const handleUpdateUserDocument = async (
        formData: UserProfileFormFieldsType,
    ) => {
        setLoading(true);
        const { error } = await firestoreUptadeDocument(
            "users",
            authUser.uid,
            formData,
        );
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        toast.success("Profil mis à jour avec succès");
        setLoading(false);
    };

    const onSubmit: SubmitHandler<UserProfileFormFieldsType> = async (
        formData,
    ) => {
        if (selectedImage) {
            handleImageUpload();
            return;
        }

        if (formData.facebook && !formData.facebook.includes("facebook.com/")) {
            setError("facebook", {
                type: "manual",
                message: "Cet url ne correspond pas à un profil facebook",
            });
            return;
        }
        if (
            formData.instagram &&
            !formData.instagram.includes("instagram.com/")
        ) {
            setError("instagram", {
                type: "manual",
                message: "Cet url ne correspond pas à un profil instagram",
            });
            return;
        }
        if (formData.tiktok && !formData.tiktok.includes("tiktok.com/")) {
            setError("tiktok", {
                type: "manual",
                message: "Cet url ne correspond pas à un profil tiktok",
            });
            return;
        }
        if (formData.youtube && !formData.youtube.includes("youtube.com/")) {
            setError("youtube", {
                type: "manual",
                message: "Cet url ne correspond pas à un profil youtube",
            });
            return;
        }
        if (formData.twitter && !formData.twitter.includes("x.com/")) {
            setError("twitter", {
                type: "manual",
                message: "Cet url ne correspond pas à un profil twitter",
            });
            return;
        }

        if (
            displayName !== formData.displayName ||
            description !== formData.description ||
            hobbies !== formData.hobbies ||
            styleLove !== formData.styleLove ||
            facebook !== formData.facebook ||
            twitter !== formData.twitter ||
            youtube !== formData.youtube ||
            tiktok !== formData.tiktok ||
            instagram !== formData.instagram
        ) {
            if (
                displayName !== formData.displayName ||
                authUser.displayName !== formData.displayName
            ) {
                const body = { displayName: formData.displayName };
                const result = await updateUserIdentificationData(
                    authUser.uid,
                    body,
                );
                if (result?.error) {
                    setLoading(false);
                    toast.error(result.error.message);
                    return;
                }
                reloadAuthUserData();
            }

            for (const key in formData) {
                if (
                    formData.hasOwnProperty(key) &&
                    formData[key as keyof UserProfileFormFieldsType] ===
                        undefined
                ) {
                    delete formData[key as keyof UserProfileFormFieldsType];
                }
            }
            handleUpdateUserDocument(formData);
            return;
        }
    };

    return (
        <AdminAccountView
            imagePreview={imagePreview}
            uploadProgress={uploadProgress}
            handleImageSelect={handleImageSelect}
            form={{
                onSubmit,
                control,
                errors,
                isLoading,
                register,
                handleSubmit,
            }}
        />
    );
};
