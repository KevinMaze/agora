import { useAuth } from "@/context/AuthUserContext";
import { AdminAccountView } from "./admin-account.view";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFieldsType } from "@/types/form";
import { useEffect } from "react";
import { firestoreUptadeDocument } from "@/api/firestore";
import { toast } from "react-toastify";

export const AdminAccountContainer = () => {
    const { authUser } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToggle();

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
        // upload avatar

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
