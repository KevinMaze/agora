import clsx from "clsx";
import Image from "next/image";

interface Props {
    size?: "small" | "medium" | "large";
    src: string;
    alt: string;
}

export const Avatar = ({ size = "medium", src, alt }: Props) => {
    let sizeAvatar: string;
    switch (size) {
        case "small":
            sizeAvatar = "w-[26] h-[26]";
            break;
        case "medium": //default
            sizeAvatar = "w-[32] h-[32]";
            break;
        case "large":
            sizeAvatar = "w-[48] h-[48]";
            break;
    }
    return (
        <div className={clsx(sizeAvatar, "bg-gray-400 rounded-full relative")}>
            <Image
                fill
                src={src}
                alt={alt}
                className="rounded-full object-cover object-top"
            />
        </div>
    );
};
