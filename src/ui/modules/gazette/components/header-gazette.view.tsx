import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Men from "@/../public/assets/images/men.jpg";
import Women from "@/../public/assets/images/women.jpg";
import Paper from "@/../public/assets/images/paper.jpg";
import { Container } from "@/ui/components/container";

export const HeaderGazette = () => {
    return (
        <div className="">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mt-3 uppercase text-center text-4xl sm:text-6xl lg:text-8xl"
            >
                La Gazette
            </Typo>

            <div className="mt-10 w-full">
                <div className="relative lg:w-[1200px] h-screen mx-auto">
                    <div className="">
                        <Image
                            src={Women}
                            alt="Femme"
                            className="absolute h-40 sm:h-50 lg:h-70 w-auto rounded-tl-xl"
                        />
                    </div>
                    <div className="absolute top-[150px] sm:top-[180px] lg:top-[180px] sm:left-[200px] lg:left-[300px] left-[50] z-1">
                        <Image
                            src={Paper}
                            alt="Papier"
                            className="h-40 sm:h-90 lg:h-100 w-auto rounded-br-xl rounded-tl-xl border-1 border-primary"
                        />
                    </div>
                    <div className="absolute top-[300px] sm:top-[450px] lg:top-[450px] left-[120px] sm:left-[400px] lg:left-[790px] z-0">
                        <Image
                            src={Men}
                            alt="Homme"
                            className="h-40 sm:h-90 lg:h-70 w-auto rounded-br-xl"
                        />
                    </div>
                </div>
            </div>
            <div className="border-1 border-primary w-60 sm:w-180 lg:w-250 m-auto"></div>
        </div>
    );
};
