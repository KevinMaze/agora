import Image from "next/image";
import BookBox from "@/../public/assets/images/bookbox.jpg";
import { Typo } from "@/ui/design-system/typography";

export const HeaderLibrairie = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={BookBox}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center items-start pl-50">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mt-3 uppercase text-center text-8xl"
                >
                    La
                    <br />
                    boite
                    <br />
                    aux
                    <br />
                    livres
                </Typo>
            </div>
        </div>
    );
};
