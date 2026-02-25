import { AddBookFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { AddBookAdminAccountView } from "./add-book-admin-account-view";
import { useAuth } from "@/context/AuthUserContext";
import { useState } from "react";

export const AddBookAdminAccountContainer = () => {
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
    } = useForm<AddBookFormFieldsType>({
        defaultValues: {
            coupDeCoeur: false,
        },
    });

    const onSubmit: SubmitHandler<AddBookFormFieldsType> = async (formData) => {
        setLoading(true);

        const { image, ...bookData } = formData;
        const imageFile = image[0];

        if (!imageFile) {
            setLoading(false);
            toast.error("Tu dois ajouter une image");
            return;
        }

        const { data: url, error: storageError } = await storageUploadFile(
            `books/${authUser.displayName}-${imageFile.name}`,
            imageFile,
        );

        if (storageError) {
            setLoading(false);
            toast.error(storageError.message);
            return;
        }

        const data = {
            ...bookData,
            coupDeCoeur: !!bookData.coupDeCoeur,
            image: url,
            userId: authUser.uid,
            creation_date: new Date(),
        };

        const { error: firestoreError } = await firestoreAddDocument(
            "books",
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
        toast.success("Le livre a bien été ajouté");
    };

    return (
        <AddBookAdminAccountView
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
