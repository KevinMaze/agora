import { AddBookBoxItemFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { AddBookBoxAdminAccountView } from "./add-book-box-admin-account-view";
import { useAuth } from "@/context/AuthUserContext";
import { useState } from "react";

export const AddBookBoxAdminAccountContainer = () => {
    const { value: isLoading, setValue: setLoading } = useToggle();
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const { authUser } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } =
        useForm<AddBookBoxItemFormFieldsType>();

    const onSubmit: SubmitHandler<AddBookBoxItemFormFieldsType> = async (formData) => {
        setLoading(true);

        const { image, ...itemData } = formData;
        const imageFile = image?.[0];
        let imageUrl: string | null = null;

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `book-box/${authUser.displayName}-${imageFile.name}`,
                imageFile,
            );
            if (storageError) {
                setLoading(false);
                toast.error(storageError.message);
                return;
            }
            imageUrl = url ?? null;
        }

        const { error: firestoreError } = await firestoreAddDocument("bookBox", {
            ...itemData,
            image: imageUrl,
            status: "available",
            userId: authUser.uid,
            creation_date: new Date(),
        });

        if (firestoreError) {
            setLoading(false);
            toast.error(firestoreError.message);
            return;
        }

        setLoading(false);
        reset();
        setImagePreview(null);
        toast.success("Le livre a bien été ajouté à la boîte !");
    };

    return (
        <AddBookBoxAdminAccountView
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            form={{ errors, register, handleSubmit, onSubmit, isLoading }}
        />
    );
};
