import { useState } from "react";
import { LoginView } from "./login.view";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFieldsType } from "@/types/form";

export const LoginContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<LoginFormFieldsType>();

    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
        setIsLoading(true);
        console.log("Register form data:", formData);
    };
    return (
        <LoginView
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
