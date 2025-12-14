import { RegisterFormFieldsType } from "@/types/form";
import { RegisterView } from "./register.view";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { firebaseCreateUser } from "@/api/authentication";
import { toast } from "react-toastify";
import { useToggle } from "@/hooks/use-toggle";
import { Button } from "@/ui/design-system/button";

export const RegisterContainer = () => {
    const { value: isLoading, setValue: setIsLoading, toggle } = useToggle();
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
            toast.error(error.message);
            return;
        }
        toast.success(`Bienvenue dans l'Agora, ${username} !`);
        setIsLoading(false);
        reset();
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
        <>
            <Button action={toggle}>Test Button</Button>
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
