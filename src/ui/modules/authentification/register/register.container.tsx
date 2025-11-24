import { RegisterFormFieldsType } from "@/types/form";
import { RegisterView } from "./register.view";
import { SubmitHandler, useForm } from "react-hook-form";

export const RegisterContainer = () => {
    const isLoading = false;
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<RegisterFormFieldsType>();

    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (
        formData
    ) => {
        console.log("Register form data:", formData);
    };
    return (
        <>
            <RegisterView
                form={{
                    errors,
                    control,
                    register,
                    handleSubmit,
                    onSubmit,
                    isLoading,
                }}
            />
        </>
    );
};
