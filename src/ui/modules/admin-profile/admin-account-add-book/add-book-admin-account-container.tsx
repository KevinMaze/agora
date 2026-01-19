import { AddBookFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { AddBookAdminAccountView } from "./add-book-admin-account-view";

export const AddBookAdminAccountContainer = () => {
    const { value: isLoading, setValue: setLoading } = useToggle();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<AddBookFormFieldsType>();

    const onSubmit: SubmitHandler<AddBookFormFieldsType> = async (formData) => {
        setLoading(true);

        // 1. Gérer l'image
        const imageFile = formData.image[0];
        if (!imageFile) {
            setLoading(false);
            toast.error("Veuillez sélectionner une image pour le livre.");
            return;
        }

        const imagePath = `books/${Date.now()}_${imageFile.name}`;
        const { data: imageUrl, error: storageError } = await storageUploadFile(
            imagePath,
            imageFile,
        );

        if (storageError || !imageUrl) {
            setLoading(false);
            toast.error(
                storageError?.message ||
                    "Une erreur est survenue lors de l'envoi de l'image.",
            );
            return;
        }

        // 2. Préparer les données pour Firestore
        const { image, ...bookData } = formData;
        const document = {
            ...bookData,
            imageUrl: imageUrl,
            createdAt: new Date(),
        };

        // 3. Ajouter le document à Firestore
        const { error: firestoreError } = await firestoreAddDocument(
            "books",
            document,
        );

        if (firestoreError) {
            setLoading(false);
            toast.error(firestoreError.message);
            return;
        }

        toast.success("Livre ajouté avec succès !");
        reset();
        setLoading(false);
    };

    return (
        <>
            <AddBookAdminAccountView
                form={{
                    errors,
                    register,
                    handleSubmit,
                    onSubmit,
                    isLoading,
                }}
            />
        </>
    );
};
