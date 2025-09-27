interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "white";
}

export const Spinner = ({ size = "medium", variant = "primary" }: Props) => {
    let variantStyle: string = "",
        sizeStyle: string = "";

    switch (size) {
        case "small":
            sizeStyle = "";
            break;
        case "medium": //default
            sizeStyle = "";
            break;
        case "large":
            sizeStyle = "";
            break;
    }

    switch (variant) {
        case "primary": // default
            variantStyle = "";
            break;
        case "white":
            variantStyle = "";
            break;
    }
    return <div> </div>;
};
