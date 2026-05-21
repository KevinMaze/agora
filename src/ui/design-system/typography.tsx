/**
 * Typo — composant typographique du design system.
 *
 * Centralise les styles de texte pour garantir la cohérence visuelle.
 * Supporte n'importe quel élément HTML via la prop `component`.
 *
 * Variants :
 *  - "title" : police serif (Cinzel Decorative) — titres de section
 *  - "para"  : police sans-serif (Montserrat) — texte courant (défaut)
 *  - "span"  : police sans-serif + texte petit — labels, métadonnées
 *
 * Couleurs (variables CSS du thème) :
 *  - "primary"   : orange (#E35336)
 *  - "secondary" : doré (#CC7722)
 *  - "tier"      : vert (#008000)
 *  - "other"     : blanc
 *  - "danger"    : rouge (#FF0000)
 *
 * Exemple :
 *   <Typo variant="title" component="h1" color="primary" weight="bold">Titre</Typo>
 */
import clsx from "clsx";

interface TypoProps {
    variant?: "title" | "para" | "span";
    component?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "li" | "div";
    /** Alias de `component` pour rétrocompatibilité interne */
    components?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "li" | "div";
    color?: "primary" | "secondary" | "tier" | "other" | "danger";
    weight?: "normal" | "bold" | "extrabold";
    className?: string;
    children: React.ReactNode;
}

type TypoPropsWithHtml = TypoProps & React.HTMLAttributes<HTMLElement>;

export const Typo = ({
    variant = "para",
    component,
    components,
    color = "primary",
    weight = "normal",
    className,
    children,
    ...rest
}: TypoPropsWithHtml) => {
    const Component = component || components || "p";
    let variantStyle: string = "";
    let colorStyle: string = "";

    switch (variant) {
        case "title":
            variantStyle = "font-serif";
            break;
        case "para":
            variantStyle = "font-sans";
            break;
        case "span":
            variantStyle = "font-sans text-sm";
            break;
    }

    switch (color) {
        case "primary":
            colorStyle = "text-primary";
            break;
        case "secondary":
            colorStyle = "text-secondary";
            break;
        case "tier":
            colorStyle = "text-tier";
            break;
        case "other":
            colorStyle = "text-white";
            break;
        case "danger":
            colorStyle = "text-danger";
            break;
    }

    return (
        <Component
            className={clsx(
                variantStyle,
                colorStyle,
                weight === "normal" && "font-normal",
                weight === "bold" && "font-bold",
                weight === "extrabold" && "font-extrabold",
                className,
            )}
            {...rest}
        >
            {children}
        </Component>
    );
};
