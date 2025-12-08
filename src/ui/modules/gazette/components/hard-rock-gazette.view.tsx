import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Legolas from "@/../public/assets/images/legolas.jpg";
import Drum from "@/../public/assets/images/drums.jpg";
import Monkey from "@/../public/assets/images/monkey.jpg";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const HardRockCoffee = () => {
    return (
        <Container className="mt-50">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="uppercase text-6xl text-center underline mb-10"
            >
                Hard Rock Coffee
            </Typo>
            <Typo
                variant="para"
                components="p"
                weight="normal"
                className="text-center mb-10"
                color="secondary"
            >
                concerts trimestriels (19h/22h)
            </Typo>

            <div className="flex flex-col lg:flex-row bg-foreground rounded-2xl items-center">
                <div className="w-full flex flex-col justify-center mt-15">
                    <Typo
                        variant="para"
                        components="h2"
                        color="secondary"
                        className="text-2xl sm:text-4xl lg:text-6xl uppercase text-center mb-10"
                    >
                        Titre
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        color="other"
                        className="p-4 text-[14px] sm:text-xl"
                    >
                        Quam quidem partem accusationis admiratus sum et moleste
                        tuli potissimum esse Atratino datam. Neque enim decebat
                        neque aetas illa postulabat neque, id quod animadvertere
                        poteratis, pudor patiebatur optimi adulescentis in tali
                        illum oratione versari. Vellem aliquis ex vobis
                        robustioribus hunc male dicendi locum suscepisset;
                        aliquanto liberius et fortius et magis more nostro
                        refutaremus istam male dicendi licentiam. Tecum,
                        Atratine, agam lenius, quod et pudor tuus moderatur
                        orationi meae et meum erga te parentemque tuum
                        beneficium tueri debeo.
                    </Typo>
                    <div className="flex flex-row justify-around mt-5 mb-4">
                        <FaFacebook className="lg:text-2xl text-primary" />
                        <FaXTwitter className="lg:text-2xl text-primary" />
                        <FaInstagram className="lg:text-2xl text-primary" />
                        <FaYoutube className="lg:text-2xl text-primary" />
                        <FaTiktok className="lg:text-2xl text-primary" />
                    </div>
                </div>
                <div className="w-full relative min-h-[300px] mt-5">
                    <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-10 sm:left-40 -rotate-15 z-1">
                        <Image
                            src={Legolas}
                            alt=""
                            className="rounded-2xl"
                            objectFit="cover"
                            fill
                        />
                    </div>
                    <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-20 sm:left-80 rotate-15">
                        <Image
                            src={Drum}
                            alt=""
                            className="rounded-2xl"
                            objectFit="cover"
                            fill
                        />
                    </div>
                    <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-30">
                        <Image
                            src={Monkey}
                            alt=""
                            className="rounded-2xl"
                            objectFit="cover"
                            fill
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
