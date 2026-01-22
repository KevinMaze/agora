import { RegisterFormFieldsType } from "@/types/form";
import { RegisterView } from "./register.view";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import {
    firebaseCreateUser,
    sendEmailVerificationProcedure,
} from "@/api/authentication";
import { toast } from "react-toastify";
import { useToggle } from "@/hooks/use-toggle";
import { firestoreCreateDocument } from "@/api/firestore";
import { useRouter } from "next/router";

export const RegisterContainer = () => {
    const router = useRouter();
    const { value: isLoading, setValue: setIsLoading } = useToggle();
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

    const handleCreateUserDocument = async (
        collectionName: string,
        documentId: string,
        document: object,
    ) => {
        const { error } = await firestoreCreateDocument(
            collectionName,
            documentId,
            document,
        );
        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }
        toast.success(`Bienvenue dans l'Agora !`);
        setIsLoading(false);
        reset();
        sendEmailVerificationProcedure();
        router.push("/mon_espace");
    };

    const handleCreateUserAuthentification = async ({
        email,
        password,
        pseudo,
    }: RegisterFormFieldsType) => {
        const { data, error } = await firebaseCreateUser(email, password);
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
            return;
        }
        const userDocumentData = {
            email: email,
            displayName: pseudo || "",
            uid: data.uid,
            creation_date: new Date(),
        };
        await handleCreateUserDocument("users", data.uid, userDocumentData);
    };

    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (
        formData,
    ) => {
        setIsLoading(true);
        const { password } = formData;

        if (password.length <= 5) {
            setError("password", {
                type: "manual",
                message: "Le mot de passe doit contenir au moins 6 caractères",
            });
            setIsLoading(false);
            return;
        }
        await handleCreateUserAuthentification(formData);
    };
    return (
        <>
            <RegisterView
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

// episode 22 1:01:17
