import Image from "next/image";
import Book from "@/../public/assets/images/book.png";
import { Typo } from "@/ui/design-system/typography";

export const AproposHeaderView = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={Book}
                    alt="Arrière-plan de la bibliothèque Agora"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="absolute bottom-0 left-0 mb-10 ml-10">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="uppercase text-8xl"
                    >
                        A propos
                    </Typo>
                </div>
            </div>
        </div>
    );
};
