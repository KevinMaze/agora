import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import { Spinner } from "./spinner";
import Link from "next/link";
import { LinkType, LinkTypes } from "@/lib/link-type";

interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "disabled" | "icon" | "danger";
    icon?: IconProps;
    iconTheme?: "primary" | "disabled";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
    baseUrl?: string;
    linkType?: LinkType;
    action?: () => void;
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
    type = "button",
    action,
}: Props) => {
    let variantStyle: string = "",
        sizeStyle: string = "";
    let baseColorStyle: string = "";
    let hoverColorStyle: string = "";
    let overlayStyle: string = "";

    switch (variant) {
        case "primary": //default
            variantStyle = "border-2 border-foreground rounded-xl";
            baseColorStyle = "bg-primary text-background";
            hoverColorStyle = "hover:bg-secondary hover:text-tier";
            overlayStyle = "bg-primary text-background";
            break;
        case "disabled":
            variantStyle =
                "cursor-not-allowed border-2 border-foreground rounded-xl";
            baseColorStyle = "bg-foreground text-background";
            overlayStyle = "bg-foreground text-background";
            break;
        case "icon":
            if (iconTheme === "primary") {
                variantStyle = "rounded-full";
                baseColorStyle = "bg-primary text-background";
                hoverColorStyle = "hover:bg-secondary";
            }
            if (iconTheme === "disabled") {
                variantStyle =
                    "cursor-not-allowed rounded-xl";
                baseColorStyle = "bg-foreground text-background";
            }
            break;
        case "danger":
            variantStyle = "border-2 border-foreground rounded-xl";
            baseColorStyle = "bg-red-600 text-other";
            hoverColorStyle = "hover:bg-red-700";
            overlayStyle = "bg-red-600 text-other";
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
            break;
        case "small":
        default:
            sizeStyle = `${
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm font-small uppercase border-2 border-foreground`;
            break;
    }

    const handleClick = () => {
        action?.();
    };

    const renderAnimatedText = (text: string) => {
        const letters = text.split("");
        return (
            <span className="relative z-10 inline-flex text-inherit">
                {letters.map((letter, index) => {
                    const isEven = (index + 1) % 2 === 0;
                    return (
                        <span
                            key={`${letter}-${index}`}
                            className={clsx(
                                "inline-block opacity-0 transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover/btn:duration-300",
                                isEven
                                    ? "translate-y-[15px]"
                                    : "translate-y-[-15px]",
                                "group-hover/btn:opacity-100 group-hover/btn:translate-y-0",
                                "delay-0 group-hover/btn:[transition-delay:var(--letter-delay)]",
                            )}
                            style={
                                {
                                    ["--letter-delay" as any]: `${index * 60}ms`,
                                } as React.CSSProperties
                            }
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    );
                })}
            </span>
        );
    };

    const renderAnimatedIcon = (
        position: "left" | "right",
        IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    ) => {
        const fromClass =
            position === "left" ? "translate-y-[-12px]" : "translate-y-[12px]";
        return (
            <span
                className={clsx(
                    "inline-flex opacity-0 transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.87,0,0.13,1)]",
                    "group-hover/btn:duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-y-0",
                    fromClass,
                )}
            >
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
        );
    };

    const isTextOnly =
        typeof children === "string" || typeof children === "number";
    const labelText = isTextOnly ? String(children) : "";
    const shouldAnimateText = isTextOnly && variant !== "icon";
    if (shouldAnimateText && variant === "primary") {
        baseColorStyle = "bg-secondary text-tier";
        hoverColorStyle = "";
    }
    if (shouldAnimateText && variant === "danger") {
        baseColorStyle = "bg-red-700 text-other";
        hoverColorStyle = "";
    }

    const buttonContent = (
        <>
            {shouldAnimateText && (
                <div
                    className={clsx(
                        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
                        "delay-[40ms] group-hover/btn:delay-0",
                        "group-hover/btn:translate-y-full",
                        overlayStyle,
                    )}
                >
                    <div className={clsx(icon && "flex items-center gap-2")}>
                        {icon && iconPosition === "left" && (
                            <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                        <span>{labelText}</span>
                        {icon && iconPosition === "right" && (
                            <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                    </div>
                </div>
            )}
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
                        {icon &&
                            iconPosition === "left" &&
                            (shouldAnimateText
                                ? renderAnimatedIcon("left", icon.icon)
                                : (
                                      <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                  ))}
                        {shouldAnimateText
                            ? renderAnimatedText(labelText)
                            : children}
                        {icon &&
                            iconPosition === "right" &&
                            (shouldAnimateText
                                ? renderAnimatedIcon("right", icon.icon)
                                : (
                                      <icon.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                  ))}
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
                baseColorStyle,
                hoverColorStyle,
                sizeStyle,
                isLoading && "cursor-wait",
                "relative",
                "cursor-pointer",
                "group/btn",
                "overflow-hidden"
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
