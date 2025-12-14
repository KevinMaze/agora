import { RegisterFormFieldsType } from "@/types/form";
import { RegisterView } from "./register.view";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

export const RegisterContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (
        formData
    ) => {
        setIsLoading(true);
        console.log("Register form data:", formData);
    };
    return (
        <RegisterView
            form={{
                errors,
                register,
                handleSubmit,
                onSubmit,
                isLoading,
                watch: () => {
                    return "Les mots de passe ne correspondent pas";
                },
            }}
        />
    );
};
