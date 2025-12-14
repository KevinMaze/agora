import clsx from "clsx";
import { div } from "framer-motion/client";
import { Typo } from "../typography";

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
        <div>
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(
                    isLoading && "cursor-not-allowed",
                    "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500",
                    {
                        "border-red-600 border-3 placeholder-red-600":
                            errors[id],
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
            {errors[id] && (
                <Typo
                    variant="para"
                    components="div"
                    color="danger"
                    className="mt-2"
                >
                    {errors[id]?.message}
                </Typo>
            )}
        </div>
    );
};
