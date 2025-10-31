import Image from "next/image";
import Biblio from "@/../public/assets/images/bibliotheque-header.jpg";
import Crack from "@/../public/assets/images/déchiré.png";
import { Typo } from "@/ui/design-system/typography";

export const Header = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={Biblio}
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
                        className="mt-3 uppercase text-center text-8xl transform -translate-x-35 -rotate-50"
                    >
                        La Rentrée
                    </Typo>
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="mt-3 uppercase text-center text-8xl transform translate-x-10 -rotate-50"
                    >
                        Littéraire
                    </Typo>
                </div>
                <Image
                    src={Crack}
                    alt="Effet déchiré"
                    className="absolute bottom-[-1rem] w-full h-60 object-cover rotate-180"
                />
            </div>
        </div>
    );
};
