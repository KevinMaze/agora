import clsx from "clsx";
import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";
import { Typo } from "../typography";

interface Props<TFieldValues extends FieldValues> {
    isLoading: boolean;
    placeholder?: string;
    rows?: number;
    register: UseFormRegister<TFieldValues>;
    errors: FieldErrors<TFieldValues> &
        Record<string, { message?: string } | undefined>;
    errorMsg?: string;
    id: Path<TFieldValues>;
    required?: boolean;
    isAutoCompleted?: boolean;
    label?: string;
    readOnly?: boolean;
}

export const Textarea = <TFieldValues extends FieldValues>({
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
    readOnly = false,
}: Props<TFieldValues>) => {
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
                    (isLoading || readOnly) && "cursor-not-allowed",
                    "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500",
                    {
                        "border-red-600 border-3 placeholder-red-600 ":
                            errors[id],
                        "border-primary": !errors[id],
                    },
                )}
                disabled={isLoading}
                readOnly={readOnly}
                {...register(id, {
                    required: { value: required, message: errorMsg },
                })}
                autoComplete={isAutoCompleted ? "on" : "off"}
            />
            {errors[id] && (
                <Typo
                    variant="para"
                    component="div"
                    color="danger"
                    className="mt-2"
                >
                    {errors[id]?.message}
                </Typo>
            )}
        </div>
    );
};
