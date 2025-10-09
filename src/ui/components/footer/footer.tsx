import Image from "next/image";
import { Container } from "../container";
import Colonne from "@/../public/assets/images/colonne.png";
import { Typo } from "@/ui/design-system/typography";
import { Logo } from "@/ui/design-system/logo";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className=" bg-amber-300">
            <Container className="flex justify-between">
                <div className=" bg-amber-600">
                    <Image src={Colonne} alt="Colonne gauche" width={150} />
                </div>
                <div className="">
                    <Link href="/">
                        <Logo size="large" />
                    </Link>
                    <Typo>Bienvenue</Typo>
                </div>
                <div className="bg-amber-600">
                    <Image src={Colonne} alt="Colonne droite" width={150} />
                </div>
            </Container>
        </div>
    );
};
