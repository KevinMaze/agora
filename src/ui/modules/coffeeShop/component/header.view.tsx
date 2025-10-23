import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";

// J'ai utilisé des images existantes. Remplacez-les par les vôtres.
import Image1 from "@/../public/assets/images/image1.jpg";
import Image2 from "@/../public/assets/images/image2.jpg";
import Image3 from "@/../public/assets/images/image3.jpg";

export const Header = () => {
    return (
        <>
            <div className="">
                {/* section 1 */}
                <div className="pl-20 flex">
                    <Image
                        src={Image1}
                        alt="image1"
                        className="object-cover h-100 w-80 rounded-2xl"
                    />
                    <Typo
                        variant="title"
                        components="h2"
                        weight="extrabold"
                        className="text-4xl md:text-6xl uppercase"
                    >
                        Un Café
                    </Typo>
                </div>

                {/* Section 2 */}
                <div className="flex flex-row justify-center">
                    <Typo
                        variant="title"
                        components="h2"
                        weight="normal"
                        className="text-4xl md:text-3xl uppercase justify-end"
                        color="secondary"
                    >
                        le choix
                    </Typo>
                    <Image
                        src={Image2}
                        alt="Gourmandise"
                        className="object-cover h-100 w-80 rounded-2xl"
                    />
                    <Typo
                        variant="title"
                        components="h2"
                        weight="normal"
                        className="text-4xl md:text-4xl uppercase justify-star"
                        color="secondary"
                    >
                        une gourmandise
                    </Typo>
                </div>

                {/* Section 3 */}
                <div className="flex">
                    <Image
                        src={Image3}
                        alt="Menu à la carte"
                        className="object-cover h-100 w-80 rounded-2xl"
                    />

                    <Typo
                        variant="title"
                        components="h2"
                        weight="extrabold"
                        className="text-4xl md:text-4xl uppercase "
                    >
                        à la carte
                    </Typo>
                </div>
            </div>

            <div className="border-primary border-1 h-0.5 w-250 m-auto p-auto mt-20 mb-20"></div>
        </>
    );
};
