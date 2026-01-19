import { AddBookFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestoreAddDocument } from "@/api/firestore";
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

    const handleCreateBookDocument = async (
        collectionName: string,
        document: object,
    ) => {
        const { error } = await firestoreAddDocument(collectionName, document);
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success(`Livre ajouté avec succès !`);
        setLoading(false);
        reset();
    };

    const onSubmit: SubmitHandler<AddBookFormFieldsType> = async (formData) => {
        console.log("formData", formData);
        setLoading(true);
        handleCreateBookDocument("books", formData);
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
