import clsx from "clsx";
import { Typo } from "../typography";

interface Props {
    isLoading: boolean;
    placeholder?: string;
    rows?: number;
    register: any;
    errors: any;
    errorMsg?: string;
    id: string;
    required?: boolean;
    isAutoCompleted?: boolean;
    label?: string;
}

export const Textarea = ({
    isLoading,
    rows = 5,
    placeholder,
    register,
    errors,
    errorMsg = "Ce champ est requis",
    id,
    required = true,
    isAutoCompleted = false,
    label,
}: Props) => {
    return (
        <div className="space-y-2">
            {label && (
                <Typo
                    className="pb-2"
                    color={errors[id] ? "danger" : "primary"}
                >
                    {label}
                </Typo>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={clsx(
                    isLoading && "cursor-not-allowed",
                    "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500",
                    {
                        "border-red-600 border-3 placeholder-red-600 ":
                            errors[id],
                        "border-primary": !errors[id],
                    }
                )}
                disabled={isLoading}
                {...register(id, {
                    required: { value: required, message: errorMsg },
                })}
                autoComplete={isAutoCompleted ? "on" : "off"}
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
