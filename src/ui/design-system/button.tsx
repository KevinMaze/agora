import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import { Spinner } from "./spinner";
import Link from "next/link";
import { LinkType, LinkTypes } from "@/lib/link-type";

interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "disabled" | "icon";
    icon?: IconProps;
    iconTheme?: "primary" | "disabled";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
    baseUrl?: string;
    linkType?: LinkType;
    action?: Function;
    classname?: string;
    type?: "button" | "submit" | "reset";
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
    baseUrl,
    linkType,
    classname,
    type = "button",
    action = () => {},
}: Props) => {
    let variantStyle: string = "",
        sizeStyle: string = "",
        iconSize: number = 0;

    switch (variant) {
        case "primary": //default
            variantStyle =
                "bg-primary text-background hover:bg-secondary hover:text-tier border-2 border-foreground rounded-xl";
            break;
        case "disabled":
            variantStyle =
                "bg-foreground text-background cursor-not-allowed border-2 border-foreground rounded-xl";
            break;
        case "icon":
            if (iconTheme === "primary") {
                variantStyle =
                    "bg-primary hover:bg-secondary text-background rounded-full";
            }
            if (iconTheme === "disabled") {
                variantStyle =
                    "bg-foreground text-background cursor-not-allowed rounded-xl";
            }
            break;
    }

    switch (size) {
        case "medium": //default
            sizeStyle = ` ${
                // small by default
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm sm:text-base ${
                variant === "icon" ? "sm:w-10 sm:h-10" : "sm:px-4 sm:py-2"
            } font-medium uppercase border-2 border-foreground`;
            iconSize = 20; // iconSize will be handled by responsive classes if needed
            break;
        case "large":
            sizeStyle = ` ${
                // small by default
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm sm:text-lg ${
                variant === "icon" ? "sm:w-12 sm:h-12" : "sm:px-6 sm:py-3"
            } font-bold uppercase border-2 border-foreground`;
            iconSize = 20; // iconSize will be handled by responsive classes if needed
            break;
        case "small":
        default:
            sizeStyle = `${
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm font-small uppercase border-2 border-foreground`;
            iconSize = 20;
            break;
    }

    const handleClick = () => {
        if (action) {
            action();
        }
    };

    const buttonContent = (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed">
                    {variant === "primary" || variant === "icon" ? (
                        <Spinner size="small" variant="white" />
                    ) : (
                        <Spinner size="small" />
                    )}
                </div>
            )}

            <div className={clsx(isLoading && "invisible")}>
                {icon && variant === "icon" ? (
                    <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                    <div className={clsx(icon && "flex items-center gap-2")}>
                        {icon && iconPosition === "left" && (
                            <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                        {children}
                        {icon && iconPosition === "right" && (
                            <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                    </div>
                )}
            </div>
        </>
    );

    const buttonElement = (
        <button
            type={type}
            className={clsx(
                variantStyle,
                sizeStyle,
                isLoading && "cursor-wait",
                "relative",
                "cursor-pointer"
            )}
            onClick={handleClick}
            disabled={disabled || isLoading}
        >
            {buttonContent}
        </button>
    );

    if (baseUrl) {
        if (linkType === LinkTypes.EXTERNAL) {
            return (
                <a href={baseUrl} target="_blank">
                    {buttonElement}
                </a>
            );
        } else {
            return <Link href={baseUrl}>{buttonElement}</Link>;
        }
    }
    return buttonElement;
};
