import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
}

export const RegisterForm = ({ form }: Props) => {
    const { control, register, handleSubmit, onSubmit, isLoading, errors } =
        form;
    console.log("form :", form);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="email"
                placeholder="Email"
                className=""
                disabled={isLoading}
                {...register("email", {
                    required: { value: true, message: "Ce champ est requis" },
                })}
            />
            <input
                type="password"
                placeholder="Password"
                className=""
                disabled={isLoading}
                {...register("password")}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className=""
                disabled={isLoading}
                {...register("confirmPassword")}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
            </button>
        </form>
    );
};
