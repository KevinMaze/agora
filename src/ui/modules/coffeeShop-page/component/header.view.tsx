import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";

// J'ai utilisé des images existantes. Remplacez-les par les vôtres.
import Image1 from "@/../public/assets/images/image1.jpg";
import Image2 from "@/../public/assets/images/image2.jpg";
import Image3 from "@/../public/assets/images/image3.jpg";

export const Header = () => {
    return (
        <div className="mt-10 sm:mb-100 lg:mb-150 w-full">
            <div className="relative lg:w-[1200px] h-screen mx-auto">
                {/* section 1 */}
                <div className="absolute z-2 sm:left-[50px] left-[20px]">
                    <div className="flex">
                        <Image
                            src={Image1}
                            alt="image1"
                            className="object-cover h-full lg:w-110 sm:w-90 w-40 rounded-2xl border-1 border-primary"
                        />
                        <Typo
                            variant="para"
                            components="h2"
                            weight="extrabold"
                            className="text-1xl sm:text-4xl lg:text-6xl uppercase sm:ml-5 ml-2"
                        >
                            Un Café
                        </Typo>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="absolute top-[150px] sm:top-[250px] lg:top-[250px] sm:left-[200px] lg:left-[200px] left-[50] z-1">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-end">
                            <Typo
                                variant="para"
                                components="h2"
                                weight="normal"
                                className="text-[10px] sm:text-2xl lg:text-4xl uppercase mr-1 lg:mr-5 w-12 sm:w-30 lg:w-45"
                                color="secondary"
                            >
                                le choix
                            </Typo>
                        </div>
                        <Image
                            src={Image2}
                            alt="Gourmandise"
                            className="object-cover h-full lg:w-110 sm:w-90 w-40 rounded-2xl border-1 border-primary"
                        />
                        <Typo
                            variant="para"
                            components="h2"
                            weight="normal"
                            className="text-[10px] sm:text-2xl lg:text-3xl uppercase ml-1 sm:ml-3 lg:ml-3"
                            color="secondary"
                        >
                            une gourmandise
                        </Typo>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="absolute top-[300px] sm:top-[500px] lg:top-[500px] left-[100px] sm:left-[400px] lg:left-[500px] z-0">
                    <div className="flex">
                        <div className="flex flex-col justify-end">
                            <Typo
                                variant="para"
                                components="h2"
                                weight="extrabold"
                                className="text-[10px] sm:text-2xl lg:text-4xl uppercase mr-5"
                            >
                                à la carte
                            </Typo>
                        </div>
                        <Image
                            src={Image3}
                            alt="Menu à la carte"
                            className="object-cover h-full lg:w-110 sm:w-90 w-40 rounded-2xl border-1 border-primary"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-[700px] sm:top-[1200px] lg:top-[1400px] border-primary border-1 h-0.5 w-60 sm:w-180 lg:w-250 left-1/2 transform -translate-x-1/2"></div>
        </div>
    );
};
