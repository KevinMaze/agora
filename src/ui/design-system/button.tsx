import clsx from "clsx";

interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "disabled" | "icon";
    icon?: React.ReactNode;
    iconTheme?: "primary" | "secondary" | "disabled";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const Button = ({
    size = "medium",
    variant = "primary",
    icon,
    iconTheme = "primary",
    iconPosition = "right",
    disabled,
    isLoading,
    children,
}: Props) => {
    let variantStyle: string = "",
        sizeStyle: string = "",
        iconSize: number = 0;

    switch (variant) {
        case "primary": //default
            variantStyle =
                "bg-primary text-background hover:bg-secondary hover:text-tier";
            break;
        case "secondary":
            variantStyle = "bg-secondary text-tier";
            break;
        case "disabled":
            variantStyle = "";
            break;
        case "icon":
            variantStyle = "";
            break;
    }

    switch (size) {
        case "small":
            sizeStyle = "px-3 py-1 text-sm";
            iconSize = 16;
            break;
        case "medium": //default
            sizeStyle = "px-4 py-2 text-base";
            iconSize = 20;
            break;
        case "large":
            sizeStyle = "px-6 py-3 text-lg";
            iconSize = 24;
            break;
    }

    return (
        <button
            type="button"
            className={clsx(variantStyle, iconSize, "")}
            onClick={() => console.log("click")}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
