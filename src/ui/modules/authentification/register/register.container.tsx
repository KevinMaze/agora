import { RegisterFormFieldsType } from "@/types/form";
import { RegisterView } from "./register.view";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import { firebaseCreateUser } from "@/api/authentication";

export const RegisterContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

    const handleCreateUserAuthentification = async ({
        email,
        password,
        username,
    }: RegisterFormFieldsType) => {
        const { data, error } = await firebaseCreateUser(email, password);
        if (error) {
            setIsLoading(false);
            console.log("Error creating user:", error);
            return;
        }
        console.log("User created successfully:", data);
    };

    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (
        formData
    ) => {
        setIsLoading(true);
        const { password } = formData;

        if (password.length <= 5) {
            setError("password", {
                type: "manual",
                message: "Le mot de passe doit contenir au moins 6 caractères",
            });
            return;
        }
        handleCreateUserAuthentification(formData);
    };
    return (
        <RegisterView
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
