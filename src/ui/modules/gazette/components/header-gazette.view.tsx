import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Men from "@/../public/assets/images/WH17.jpeg";
import Women from "@/../public/assets/images/WH18.jpeg";
import Paper from "@/../public/assets/images/WH16.jpeg";

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
                <div className="relative w-[320px] h-[430px] sm:w-[540px] sm:h-[730px] lg:w-[720px] lg:h-[960px] mx-auto">
                    <div className="absolute top-0 left-0 z-10">
                        <Image
                            src={Women}
                            alt="Femme"
                            className="w-28 sm:w-48 lg:w-64 aspect-[2/3] object-cover rounded-tl-xl my-shadow"
                        />
                    </div>
                    <div className="absolute top-[120px] left-[90px] sm:top-[190px] sm:left-[150px] lg:top-[260px] lg:left-[210px] z-20">
                        <Image
                            src={Paper}
                            alt="Papier"
                            className="w-32 sm:w-56 lg:w-72 aspect-[2/3] object-cover rounded-br-xl rounded-tl-xl border-1 border-primary my-shadow"
                        />
                    </div>
                    <div className="absolute top-[250px] left-[190px] sm:top-[430px] sm:left-[330px] lg:top-[560px] lg:left-[440px] z-10">
                        <Image
                            src={Men}
                            alt="Homme"
                            className="w-28 sm:w-48 lg:w-64 aspect-[2/3] object-cover rounded-br-xl my-shadow"
                        />
                    </div>
                </div>
            </div>
            <div className="border-1 border-primary w-60 sm:w-180 lg:w-250 m-auto"></div>
        </div>
    );
};
