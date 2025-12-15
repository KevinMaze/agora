import { ForgetPasswordView } from "./forget-password.view";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { sendEmailToResetPassword } from "@/api/authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const ForgetPasswordContainer = () => {
    const router = useRouter();
    const { value: isLoading, setValue: setIsLoading } = useToggle();
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm<ForgetFormFieldsType>();

    const handleResetPassword = async ({ email }: ForgetFormFieldsType) => {
        const { error } = await sendEmailToResetPassword(email);
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
            return;
        }
        toast.success(`Un email vous a été envoyé à l'adresse ${email}!`);
        setIsLoading(false);
        reset();
        router.push("/connexion");
    };

    const onSubmit: SubmitHandler<ForgetFormFieldsType> = async (formData) => {
        setIsLoading(false);
        handleResetPassword(formData);
    };
    return (
        <ForgetPasswordView
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
