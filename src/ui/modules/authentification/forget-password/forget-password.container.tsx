import { useState } from "react";
import { ForgetPasswordView } from "./forget-password.view";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetFormFieldsType } from "@/types/form";

export const ForgetPasswordContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<ForgetFormFieldsType>();

    const onSubmit: SubmitHandler<ForgetFormFieldsType> = async (formData) => {
        setIsLoading(true);
        console.log("Register form data:", formData);
    };
    return (
        <ForgetPasswordView
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
