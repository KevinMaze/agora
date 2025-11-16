import Image from "next/image";
import Collect from "@/../public/assets/images/collect.jpg";
import { Typo } from "@/ui/design-system/typography";

export const HearderCollect = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={Collect}
                    alt="Arrière-plan de la bibliothèque Agora"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="flex justify-between items-center">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="mt-3 uppercase text-center text-8xl -rotate-25"
                    >
                        Click & Collect
                    </Typo>
                </div>
            </div>
        </div>
    );
};
