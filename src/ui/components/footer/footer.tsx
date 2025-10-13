import Image from "next/image";
import { Container } from "../container";
import Colonne from "@/../public/assets/images/colonne.png";
import { Typo } from "@/ui/design-system/typography";
import { Logo } from "@/ui/design-system/logo";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="relative overflow-hidden bg-background shadow-[var(--myshadow)] z-30">
            <div className="absolute top-0 bottom-0 left-0 w-[125px] hidden md:block">
                <Image
                    src={Colonne}
                    alt="Colonne gauche"
                    fill
                    className="object-cover"
                />
            </div>
            <Container>
                <div className="items-center flex flex-col gap-6 py-10">
                    <Link href="/">
                        <Logo size="large" />
                    </Link>

                    <Typo
                        variant="para"
                        color="primary"
                        className="text-center text-sm md:text-[16px] uppercase flex flex-col md:flex-row gap-2 md:gap-4"
                        weight="bold"
                    >
                        <Link href="/">Accueil</Link> -{" "}
                        <Link href="/coffeeshop">Coffee Shop</Link> -{" "}
                        <Link href="/bibliotheque">La Bibliothèque</Link> -{" "}
                        <Link href="/librairie">La Librairie</Link> -{" "}
                        <Link href="/gazette">La Gazette</Link> -{" "}
                        <Link href="/collect">Click and Collect</Link> -{" "}
                        <Link href="/apropos">A propos</Link>
                    </Typo>

                    <Typo
                        variant="para"
                        color="secondary"
                        className="flex flex-col md:flex-row items-center gap-4 text-sm md:text-[16px]"
                    >
                        Suivez l`Agora sur
                        <Link
                            href="https://www.instagram.com"
                            target="_blank"
                            className="flex gap-1"
                        >
                            <FaInstagram />
                            Instagram
                        </Link>
                        <Link
                            href="https://www.facebook.com"
                            target="_blank"
                            className="flex gap-1"
                        >
                            <FaFacebook /> Facebook
                        </Link>
                        <Link
                            href="https://www.twitter.com"
                            target="_blank"
                            className="flex gap-1"
                        >
                            <FaXTwitter /> Twitter
                        </Link>
                    </Typo>
                    <div className="w-full border border-secondary"></div>
                    <Typo
                        variant="para"
                        color="secondary"
                        className="flex flex-col md:flex-row items-center gap-2 text-[16px]"
                    >
                        {`Copyright © ${currentYear} Agora`} -{" "}
                        <Link href="/mentions-legales">Mentions légales</Link> -{" "}
                        <Link href="/politique-de-confidentialite">
                            Politique de confidentialité
                        </Link>
                    </Typo>
                </div>
            </Container>
            <div className="absolute top-0 bottom-0 right-0 w-[125px] hidden md:block">
                <Image
                    src={Colonne}
                    alt="Colonne droite"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};
