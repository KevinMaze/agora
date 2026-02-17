import { useAuth } from "@/context/AuthUserContext";
import { AdminAccountView } from "./admin-account.view";
import { useToggle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFieldsType } from "@/types/form";

export const AdminAccountContainer = () => {
    const { authUser } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToggle();

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
    } = useForm<UserProfileFormFieldsType>();

    const handleUpdateUserDocument = async (
        formData: UserProfileFormFieldsType,
    ) => {
        setLoading(true);
        console.log(formData);
        setLoading(false);
    };

    const onSubmit: SubmitHandler<UserProfileFormFieldsType> = async (
        formData,
    ) => {
        handleUpdateUserDocument(formData);
        return;
    };

    return (
        <AdminAccountView
            form={{
                onSubmit,
                control,
                errors,
                isLoading,
                register,
                handleSubmit,
            }}
        />
    );
};
