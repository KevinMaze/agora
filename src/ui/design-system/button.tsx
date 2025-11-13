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
        case "small":
            sizeStyle = `${
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm font-small uppercase border-2 border-foreground`;
            iconSize = 20;
            break;
        case "medium": //default
            sizeStyle = ` ${
                variant === "icon"
                    ? "flex items-center justify-center w-10 h-10"
                    : "px-4 py-2"
            } text-base font-medium uppercase border-2 border-foreground`;
            iconSize = 22;
            break;
        case "large":
            sizeStyle = ` ${
                variant === "icon"
                    ? "flex items-center justify-center w-12 h-12"
                    : "px-6 py-3"
            } text-lg font-bold uppercase border-2 border-foreground`;
            iconSize = 24;
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
                <div className="absolute inset-0 flex items-center justify-center">
                    {variant === "primary" || variant === "icon" ? (
                        <Spinner size="small" variant="white" />
                    ) : (
                        <Spinner size="small" />
                    )}
                </div>
            )}

            <div className={clsx(isLoading && "invisible")}>
                {icon && variant === "icon" ? (
                    <icon.icon size={iconSize} />
                ) : (
                    <div className={clsx(icon && "flex items-center gap-2")}>
                        {icon && iconPosition === "left" && (
                            <icon.icon size={iconSize} />
                        )}
                        {children}
                        {icon && iconPosition === "right" && (
                            <icon.icon size={iconSize} />
                        )}
                    </div>
                )}
            </div>
        </>
    );

    const buttonElement = (
        <button
            type="button"
            className={clsx(
                variantStyle,
                iconSize,
                sizeStyle,
                isLoading && "cursor-wait",
                "relative",
                "cursor-pointer"
            )}
            onClick={handleClick}
            disabled={disabled}
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
