import { useEffect } from "react";
import { LoginView } from "./login.view";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFieldsType } from "@/types/form";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { useToggle } from "@/hooks/use-toggle";
import { firebaseSignInUser } from "@/api/authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const LoginContainer = () => {
    const router = useRouter();

    const { value: isLoading, setValue: setIsLoading } = useToggle();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, you can redirect or perform other actions here
                const uid = user.uid;
                console.log("User is signed in:", user);
            } else {
                // User is signed out
                console.log("No user is signed in.");
            }
        });
    }, []);

    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<LoginFormFieldsType>();

    const handleSignInUser = async ({
        email,
        password,
    }: LoginFormFieldsType) => {
        const { error } = await firebaseSignInUser(email, password);
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
            return;
        }
        toast.success(`Bienvenue dans l'Agora !`);
        setIsLoading(false);
        reset();
        router.push("/mon_espace");
    };

    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
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
        handleSignInUser(formData);
        reset();
        setIsLoading(false);
    };
    return (
        <LoginView
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
