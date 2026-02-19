import clsx from "clsx";
import type {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";
import { Typo } from "../typography";

interface Props<TFieldValues extends FieldValues> {
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
        | "url"
        | "tel"
        | "color"
        | "range"
        | "checkbox"
        | "radio"
        | "file"
        | "reset"
        | "select"
        | "option";
    register: UseFormRegister<TFieldValues>;
    errors: FieldErrors<TFieldValues> &
        Record<string, { message?: string } | undefined>;
    errorMsg?: string;
    id: Path<TFieldValues>;
    required?: boolean;
    isAutoCompleted?: boolean;
    validate?: RegisterOptions<TFieldValues, Path<TFieldValues>>["validate"];
    label?: string;
    options?: { value: string; label: string }[];
    multiple?: boolean;
    accept?: string;
    className?: string;
    readOnly?: boolean;
}

export const Input = <TFieldValues extends FieldValues>({
    isLoading,
    placeholder,
    type = "text",
    register,
    errors,
    errorMsg = "Ce champ est requis",
    id,
    required = true,
    isAutoCompleted = false,
    label,
    validate,
    options,
    multiple = false,
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

            <div className="flex items-center">
                {type === "url" && (
                    <div className=" px-4 py-2 text-background border-l border-2 border-primary rounded-md bg-foreground border-y">
                        https://
                    </div>
                )}
                {type === "select" ? (
                    <select
                        multiple={multiple}
                        className={clsx(
                            isLoading && "cursor-not-allowed",
                            "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500 bg-background",
                            {
                                "border-red-600 border-3 placeholder-red-600 ":
                                    errors[id],
                                "border-primary": !errors[id],
                            },
                        )}
                        disabled={isLoading}
                        {...register(id, {
                            required: { value: required, message: errorMsg },
                            validate: validate,
                        })}
                    >
                        {placeholder && <option value="">{placeholder}</option>}
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : type === "checkbox" && options ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-2">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    id={`${id}-${option.value}`}
                                    disabled={isLoading}
                                    className={clsx(
                                        "w-5 h-5 rounded border-2 focus:outline-none focus:ring-2 focus:ring-primary",
                                        errors[id]
                                            ? "border-red-600"
                                            : "border-gray-300",
                                    )}
                                    {...register(id, {
                                        required: {
                                            value: required,
                                            message: errorMsg,
                                        },
                                        validate: validate,
                                    })}
                                />
                                <label
                                    htmlFor={`${id}-${option.value}`}
                                    className="text-other cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className={clsx(
                            type === "url" ? "rounded-r" : "rounded",
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
                            validate: validate,
                        })}
                        autoComplete={isAutoCompleted ? "on" : "off"}
                    />
                )}
            </div>
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
