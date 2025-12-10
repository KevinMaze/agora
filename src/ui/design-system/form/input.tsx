import clsx from "clsx";

interface Props {
    isLoading: boolean;
    placeholder?: string;
    type?:
        | "text"
        | "email"
        | "password"
        | "passwordConfirme"
        | "number"
        | "date"
        | "time"
        | "datetime-local"
        | "month"
        | "week"
        | "url"
        | "tel"
        | "color"
        | "range"
        | "checkbox"
        | "radio"
        | "file"
        | "submit"
        | "reset"
        | "image"
        | "hidden";
    register: any;
    errors: any;
    errorMsg?: string;
    id: string;
    required?: boolean;
    isAutoCompleted?: boolean;
    validate?: (value: string) => boolean | string;
}

export const Input = ({
    isLoading,
    placeholder,
    type = "text",
    register,
    errors,
    errorMsg = "Ce champ est requis",
    id,
    required = true,
    isAutoCompleted = false,
    validate,
}: Props) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={clsx(
                "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500",
                {
                    "border-red-500": errors[id],
                    "border-primary": !errors[id],
                }
            )}
            disabled={isLoading}
            {...register(id, {
                required: { value: required, message: errorMsg },
            })}
            autoComplete={isAutoCompleted ? "on" : "off"}
            validate={validate}
        />
    );
};
