import { AddConcertFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthUserContext";
import { useState } from "react";
import { AddConcertAdminAccountView } from "./add-concert-account.view";

export const AddConcertAdminAccountContainer = () => {
    const { value: isLoading, setValue: setLoading } = useToggle();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { authUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddConcertFormFieldsType>();

    const onSubmit: SubmitHandler<AddConcertFormFieldsType> = async (
        formData,
    ) => {
        setLoading(true);

        const { image, ...concertData } = formData;
        const imageFiles = Array.from(image || []);

        if (imageFiles.length === 0) {
            setLoading(false);
            toast.error("Tu dois ajouter au moins une image");
            return;
        }

        if (imageFiles.length > 3) {
            setLoading(false);
            toast.error("Tu peux envoyer maximum 3 images");
            return;
        }

        const uploadResults = await Promise.all(
            imageFiles.map((imageFile) =>
                storageUploadFile(
                    `concerts/${authUser.displayName}-${Date.now()}-${imageFile.name}`,
                    imageFile,
                ),
            ),
        );

        const storageError = uploadResults.find((result) => !!result.error)?.error;
        if (storageError) {
            setLoading(false);
            toast.error(storageError.message);
            return;
        }

        const imageUrls = uploadResults
            .map((result) => result.data)
            .filter((url): url is string => !!url);

        const data = {
            ...concertData,
            images: imageUrls,
            image: imageUrls[0] || null,
            userId: authUser.uid,
            creation_date: new Date(),
        };

        const { error: firestoreError } = await firestoreAddDocument(
            "concerts",
            data,
        );

        if (firestoreError) {
            setLoading(false);
            toast.error(firestoreError.message);
            return;
        }

        setLoading(false);
        reset();
        setImagePreviews([]);
        toast.success("Le concert a bien ete ajoute");
    };

    return (
        <AddConcertAdminAccountView
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
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
