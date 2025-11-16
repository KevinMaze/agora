import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Men from "@/../public/assets/images/men.jpg";
import Women from "@/../public/assets/images/women.jpg";
import Paper from "@/../public/assets/images/paper.jpg";
import { Container } from "@/ui/components/container";

export const HeaderGazette = () => {
    return (
        <div className="relative mb-150">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mt-3 uppercase text-center text-8xl"
            >
                La Gazette
            </Typo>

            <div className="mt-20 h-200 w-full">
                <div className="relative  h-full w-full">
                    <Image
                        src={Women}
                        alt="Femme"
                        className="absolute h-70 w-auto rounded-tl-xl left-1/6"
                    />
                    <Image
                        src={Paper}
                        alt="Papier"
                        className="absolute z-1 h-100 w-auto rounded-br-xl rounded-tl-xl border-1 border-primary left-1/3 top-1/6"
                    />
                    <Image
                        src={Men}
                        alt="Homme"
                        className="absolute h-70 w-auto rounded-br-xl right-1/5 top-1/2"
                    />
                </div>
            </div>
            <div className="border-1 border-primary w-300 m-auto"></div>
        </div>
    );
};
