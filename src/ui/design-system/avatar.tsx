/**
 * Avatar — affiche la photo de profil d'un utilisateur sous forme ronde.
 *
 * Gère deux états visuels :
 *  - isLoading=true : superpose un overlay blanc semi-transparent + un Spinner
 *  - isLoading=false : affiche l'image normalement
 *
 * Si src est vide ou null, l'image 404 est affichée en fallback via la prop src de Next/Image.
 *
 * Tailles disponibles :
 *  - small     : 32px
 *  - medium    : 45px (défaut)
 *  - large     : 68px
 *  - very-large: 80px
 */
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { Spinner } from "./spinner";

interface Props {
    size?: "small" | "medium" | "large" | "very-large";
    src: string | StaticImageData;
    alt: string;
    isLoading?: boolean;
    progress?: number;
}

export const Avatar = ({ size = "medium", src, alt, isLoading }: Props) => {
    let sizeAvatar: string;
    switch (size) {
        case "small":
            sizeAvatar = "w-8 h-8";
            break;
        case "medium":
            sizeAvatar = "w-[45px] h-[45px]";
            break;
        case "large":
            sizeAvatar = "w-[68px] h-[68px]";
            break;
        case "very-large":
            sizeAvatar = "w-20 h-20";
            break;
    }

    return (
        <div
            className={clsx(
                isLoading && "flex items-center justify-center",
                sizeAvatar,
                "bg-gray-400 rounded-full relative overflow-hidden",
            )}
        >
            {/* Overlay semi-transparent pendant le chargement */}
            <div
                className={clsx(
                    isLoading ? "opacity-40" : "opacity-0",
                    "absolute z-10 w-full h-full bg-white animate",
                )}
            ></div>
            <Image
                fill
                src={src ? src : "/assets/images/404.png"}
                alt={alt}
                className={clsx(
                    isLoading && "blur-[2px]",
                    "rounded-full object-cover object-center animate",
                )}
            />
            {isLoading && <Spinner className="relative z-20" />}
        </div>
    );
};
