import { AddEvenementFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthUserContext";
import { useState } from "react";
import { AddEvenementsAdminAccountView } from "./add-evenements-admin-account-view";

export const AddEvenementsAdminAccountContainer = () => {
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
    } = useForm<AddEvenementFormFieldsType>();

    const onSubmit: SubmitHandler<AddEvenementFormFieldsType> = async (
        formData,
    ) => {
        setLoading(true);

        const { image, ...eventData } = formData;
        const imageFile = image[0];

        if (!imageFile) {
            setLoading(false);
            toast.error("Tu dois ajouter une image");
            return;
        }

        const { data: url, error: storageError } = await storageUploadFile(
            `evenements/${authUser.displayName}-${imageFile.name}`,
            imageFile,
        );

        if (storageError) {
            setLoading(false);
            toast.error(storageError.message);
            return;
        }

        const data = {
            ...eventData,
            image: url,
            userId: authUser.uid,
            creation_date: new Date(),
        };

        const { error: firestoreError } = await firestoreAddDocument(
            "evenements",
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
        toast.success("L'événement a bien été ajouté");
    };

    return (
        <AddEvenementsAdminAccountView
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
