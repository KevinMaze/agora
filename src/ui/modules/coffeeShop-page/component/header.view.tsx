import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";

// J'ai utilisé des images existantes. Remplacez-les par les vôtres.
import Image1 from "@/../public/assets/images/image1.jpg";
import Image2 from "@/../public/assets/images/image2.jpg";
import Image3 from "@/../public/assets/images/image3.jpg";

export const Header = () => {
    return (
        <div className="mt-10 mb-180 w-full h-screen flex flex-col">
            <div className="relative flex-grow">
                {/* section 1 */}
                <div className="absolute left-[200px] z-2">
                    <div className="flex">
                        <Image
                            src={Image1}
                            alt="image1"
                            className="object-cover h-full w-100 rounded-2xl border-1 border-primary"
                        />
                        <Typo
                            variant="para"
                            components="h2"
                            weight="extrabold"
                            className="text-4xl md:text-6xl uppercase ml-5"
                        >
                            Un Café
                        </Typo>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="absolute top-[250px] left-120 z-1">
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col justify-end">
                            <Typo
                                variant="para"
                                components="h2"
                                weight="normal"
                                className="text-4xl md:text-3xl uppercase mr-5"
                                color="secondary"
                            >
                                le choix
                            </Typo>
                        </div>
                        <Image
                            src={Image2}
                            alt="Gourmandise"
                            className="object-cover h-full w-100 rounded-2xl border-1 border-primary"
                        />
                        <Typo
                            variant="para"
                            components="h2"
                            weight="normal"
                            className="text-4xl md:text-4xl uppercase justify-star ml-5"
                            color="secondary"
                        >
                            une gourmandise
                        </Typo>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="absolute top-[500px] left-200 z-0">
                    <div className="flex">
                        <div className="mr-5 flex flex-col justify-end">
                            <Typo
                                variant="para"
                                components="h2"
                                weight="extrabold"
                                className="text-4xl md:text-4xl uppercase"
                            >
                                à la carte
                            </Typo>
                        </div>
                        <Image
                            src={Image3}
                            alt="Menu à la carte"
                            className="object-cover h-full w-100 rounded-2xl border-1 border-primary"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-[1500px] border-primary border-1 h-0.5 w-250 left-1/2 transform -translate-x-1/2"></div>
        </div>
    );
};
