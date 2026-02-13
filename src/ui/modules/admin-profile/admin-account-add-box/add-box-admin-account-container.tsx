import { AddBoxFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthUserContext";
import { useState } from "react";
import { AddBoxAdminAccountView } from "./add-box-admin-account-view";

export const AddBoxAdminAccountContainer = () => {
    const { value: isLoading, setValue: setLoading } = useToggle();
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const { authUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddBoxFormFieldsType>();

    const onSubmit: SubmitHandler<AddBoxFormFieldsType> = async (formData) => {
        setLoading(true);

        const { image, ...boxData } = formData;
        const imageFile = image[0];

        if (!imageFile) {
            setLoading(false);
            toast.error("Tu dois ajouter une image");
            return;
        }

        const { data: url, error: storageError } = await storageUploadFile(
            `boxes/${authUser.displayName}-${imageFile.name}`,
            imageFile,
        );

        if (storageError) {
            setLoading(false);
            toast.error(storageError.message);
            return;
        }

        const data = {
            ...boxData,
            image: url,
            userId: authUser.uid,
            creation_date: new Date(),
        };

        const { error: firestoreError } = await firestoreAddDocument(
            "boxes",
            data,
        );

        if (firestoreError) {
            setLoading(false);
            toast.error(firestoreError.message);
            return;
        }

        setLoading(false);
        reset();
        setImagePreview(null);
        toast.success("La box a bien été ajoutée");
    };

    return (
        <AddBoxAdminAccountView
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            form={{
                errors,
                register,
                handleSubmit,
                onSubmit,
                isLoading,
            }}
        />
    );
};
