import clsx from "clsx";

interface TypoProps {
    variant?: "title" | "para" | "span";
    component?: "h1" | "h2" | "p" | "span" | "li" | "div";
    color?: "primary" | "secondary" | "tier" | "other" | "danger";
    weight?: "normal" | "bold" | "extrabold";
    className?: string;
    children: React.ReactNode;
}

type TypoPropsWithHtml = TypoProps & React.HTMLAttributes<HTMLElement>;

export const Typo = ({
    variant = "para",
    component,
    color = "primary",
    weight = "normal",
    className,
    children,
    ...rest // Récupère toutes les autres props (ex: onClick)
}: TypoPropsWithHtml) => {
    const Component = component || "p";
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
            {...rest} // Applique les props supplémentaires ici
        >
            {children}
        </Component>
    );
};
