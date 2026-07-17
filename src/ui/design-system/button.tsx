/**
 * Button — composant bouton du design system.
 *
 * Fonctionnalités :
 *  - Icône positionnable à gauche ou à droite
 *  - État de chargement avec Spinner intégré
 *  - Peut être rendu comme lien (interne Next.js ou externe <a>)
 *
 * Variants :
 *  - "primary"  : fond orange (défaut)
 *  - "disabled" : fond gris, curseur interdit
 *  - "icon"     : bouton rond, contient uniquement une icône
 *  - "danger"   : fond rouge, pour les actions destructives
 *
 * Tailles : "small" | "medium" | "large"
 */
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

    // Au survol, --button-shadow-hover réduit le creux (inset) et accentue le
    // relief (offset/flou) : le bouton semble se soulever vers l'utilisateur.
    // "transition-shadow" anime le passage entre les deux états.
    // Volontairement absent des variantes "disabled" : un bouton inerte ne
    // doit pas réagir au survol.
    const hover3dEffect = "hover:button-shadow-hover transition-shadow duration-200";

    switch (variant) {
        case "primary":
            variantStyle = `button-shadow ${hover3dEffect} rounded-3xl`;
            baseColorStyle = "bg-primary text-background";
            break;
        case "disabled":
            variantStyle = "cursor-not-allowed button-shadow rounded-3xl";
            baseColorStyle = "bg-foreground text-background";
            break;
        case "icon":
            if (iconTheme === "primary") {
                variantStyle = `rounded-full button-shadow ${hover3dEffect}`;
                baseColorStyle = "bg-primary text-background";
            }
            if (iconTheme === "disabled") {
                variantStyle = "cursor-not-allowed button-shadow rounded-3xl";
                baseColorStyle = "bg-foreground text-background";
            }
            break;
        case "danger":
            variantStyle = `button-shadow ${hover3dEffect} rounded-3xl`;
            baseColorStyle = "bg-red-600 text-other";
            break;
    }

    switch (size) {
        case "medium":
            sizeStyle = ` ${
                variant === "icon"
                    ? "flex items-center justify-center w-8 h-8"
                    : "px-3 py-1"
            } text-sm sm:text-base ${
                variant === "icon" ? "sm:w-10 sm:h-10" : "sm:px-4 sm:py-2"
            } font-medium uppercase border-2 border-foreground`;
            break;
        case "large":
            sizeStyle = ` ${
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

    const buttonContent = (
        <>
            {/* Spinner de chargement centré sur le bouton */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed">
                    {variant === "primary" || variant === "icon" ? (
                        <Spinner size="small" variant="white" />
                    ) : (
                        <Spinner size="small" />
                    )}
                </div>
            )}

            {/* Contenu principal (invisible pendant le chargement) */}
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
                baseColorStyle,
                sizeStyle,
                isLoading && "cursor-wait",
                "relative",
                "cursor-pointer",
            )}
            onClick={handleClick}
            disabled={disabled || isLoading}
        >
            {buttonContent}
        </button>
    );

    // Si une URL est fournie, on enveloppe le bouton dans un lien (interne ou externe)
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
