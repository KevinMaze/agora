import clsx from "clsx";

interface TypoProps {
    variant?: "title" | "para" | "span";
    components?: "h1" | "h2" | "p" | "span";
    color?: "primary" | "secondary" | "tier";
    weight?: "normal" | "bold" | "extrabold";
    className?: string;
    children: React.ReactNode;
}

export const Typo = ({
    variant = "para",
    components = "p",
    color = "primary",
    weight = "normal",
    className,
    children,
}: TypoProps) => {
    const Component = components;
    let variantStyle: string = "";
    let colorStyle: string = "";

    switch (variant) {
        case "title":
            variantStyle = "font-serif text-4xl";
            break;
        case "para":
            variantStyle = "font-sans text-lg";
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
    }

    return (
        <Component
            className={clsx(
                variantStyle,
                colorStyle,
                weight === "normal" && "font-normal",
                weight === "bold" && "font-bold",
                weight === "extrabold" && "font-extrabold",
                className
            )}
        >
            {children}
        </Component>
    );
};
