/**
 * Spinner — indicateur de chargement SVG animé.
 *
 * Utilisé dans Button (état isLoading), Avatar (upload en cours),
 * Card (image en cours de chargement) et ScreenSpinner (plein écran).
 *
 * Props :
 *  - size    : "small" (20px) | "medium" (32px) | "large" (44px)
 *  - variant : "primary" (orange) | "white" (blanc, sur fond sombre)
 *  - className : classes Tailwind supplémentaires
 */
import clsx from "clsx";

interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "white";
    className?: string;
}

export const Spinner = ({
    size = "medium",
    variant = "primary",
    className,
}: Props) => {
    let variantStyle: string = "",
        sizeStyle: string = "";

    switch (size) {
        case "small":
            sizeStyle = "w-5 h-5";
            break;
        case "medium":
            sizeStyle = "w-8 h-8";
            break;
        case "large":
            sizeStyle = "w-11 h-11";
            break;
    }

    switch (variant) {
        case "primary":
            variantStyle = "text-primary";
            break;
        case "white":
            variantStyle = "text-white";
            break;
    }

    return (
        <svg
            role="status"
            aria-label="Chargement en cours"
            className={clsx(sizeStyle, variantStyle, "animate-spin", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};
