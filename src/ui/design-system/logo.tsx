import Image from "next/image";
import Agora from "@/../public/assets/images/logo-agora.jpg";

interface Props {
    size?: "very-small" | "small" | "medium" | "large";
}

export const Logo = ({ size = "medium" }: Props) => {
    let sizeLogo: number;
    switch (size) {
        case "very-small":
            sizeLogo = 24;
            break;
        case "small":
            sizeLogo = 32;
            break;
        case "medium": //default
            sizeLogo = 48;
            break;
        case "large":
            sizeLogo = 64;
            break;
    }
    return (
        <div>
            <Image src={Agora} alt="logo" width={sizeLogo} />
        </div>
    );
};
