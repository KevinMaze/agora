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
            sizeAvatar = "w-[32] h-[32]";
            break;
        case "medium": //default
            sizeAvatar = "w-[45] h-[45]";
            break;
        case "large":
            sizeAvatar = "w-[68] h-[68]";
            break;
        case "very-large":
            sizeAvatar = "w-[80] h-[80]";
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
