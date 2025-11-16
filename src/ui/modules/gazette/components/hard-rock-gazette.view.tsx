import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Legolas from "@/../public/assets/images/legolas.jpg";
import Drum from "@/../public/assets/images/drums.jpg";
import Monkey from "@/../public/assets/images/monkey.jpg";

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

            <div className="flex flex-row justify-between bg-foreground/80 rounded-2xl">
                <div className="w-full flex flex-col justify-center mt-15">
                    <Typo
                        variant="para"
                        components="h2"
                        color="secondary"
                        className="text-4xl uppercase text-center mb-20"
                    >
                        Titre
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        color="other"
                        className="p-5"
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
                </div>
                <div className="w-full relative">
                    <div className="absolute w-50">
                        <Image src={Legolas} alt="" />
                    </div>
                    <div className="absolute w-50">
                        <Image src={Drum} alt="" />
                    </div>
                    <div className="absolute w-50">
                        <Image src={Monkey} alt="" />
                    </div>
                </div>
            </div>
        </Container>
    );
};
