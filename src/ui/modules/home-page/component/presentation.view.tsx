"use client";

import { Container } from "@/ui/components/container";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Coffee from "@/../public/assets/images/coffee.jpg";
import Stairway from "@/../public/assets/images/stairway.jpg";
import Book from "@/../public/assets/images/book.png";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";

export const PresentationView = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <Container className="mb-60 relative">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mt-20 mb-20 uppercase underline text-xl sm:text-4xl lg:text-5xl text-center lg:text-left tracking-wider underline-offset-8"
                >
                    Présentation Rapide
                </Typo>

                <div className="flex lg:flex-row flex-col justify-center items-center h-100 mb-20 mt-60 ">
                    <div className="bg-foreground/60 backdrop-blur-sm text-center lg:rounded-l-3xl rounded-3xl">
                        <Typo
                            variant="para"
                            components="p"
                            weight="normal"
                            className="text-center p-15 text-[10px] sm:text-[12px] lg:text-[16px]"
                            color="other"
                        >
                            <span className="text-tier uppercase underline font-extrabold text-2xl">
                                Agora :
                            </span>{" "}
                            “du grec ancien ἀγορά / agorá, a d'abord désigné,
                            dans la Grèce antique, une réunion de citoyens,
                            ainsi que l'espace public où celle-ci a lieu.”. Nous
                            ne sommes certes pas grecs, mais nous vous
                            accueillons à L’Agora avec un seul mot d’ordre :
                            venir vous réunir ici, dans un lieu qui allie
                            plaisir de l’esprit avec plaisir des papilles.
                            <br />
                            <br />
                            Librairie neuf et occasion, nous faisons tout pour
                            vous proposer ce que l’édition fait de plus actuel,
                            mais aussi ce qu’elle n’a pas su faire exister assez
                            longtemps. Nous nous donnons également pour mission
                            de dénicher des ouvrages passés inaperçus, et
                            trouver pour vous les pépites littéraires que le
                            monde de l'édition à négligé, afin de démocratiser
                            une littérature de proximité et/ou émergente.
                            <br />
                            <br />
                            Avec toutes ces bonnes intentions, profitez-en pour
                            vous régaler chez nous, avec des boissons et des
                            gourmandises inspirées d'oeuvres, de titres ou de
                            personnages littéraires.
                            <br />
                            <br />
                            Avec vous, nous pouvons faire de L’Agora un lieu où
                            nos pourrons échanger, construire, et partager des
                            moments de convivialité entre amis, en famille, ou
                            avec des personnes que nous ne connaissons pas
                            encore….
                            <br />
                            <br />
                            Cette nouvelle Agora est le pari d’un lieu qui ose
                            mettre à table les divers supports créatifs qui
                            communiquent et se rencontrent autour d’un seul et
                            même ferment : la culture - dans ce qu’elle a de
                            plus vivant, de plus partageable, de plus indocile.
                        </Typo>
                    </div>
                    <Image
                        src={Stairway}
                        alt="Stairway"
                        className="w-sm lg:w-lg shadow-[var(--myshadow)] rounded-3xl border-1 border-primary"
                    />
                </div>
                <Image
                    src={Coffee}
                    alt="Coffee"
                    className="w-lg shadow-[var(--myshadow)] rounded-3xl absolute -z-1 border-1 border-primary hidden lg:block"
                    style={{
                        transform: `translateY(${
                            offsetY * -0.04
                        }px) translateX(50%) translateY(0%)`,
                    }}
                />
                <div className="flex justify-between gap-10 mt-80">
                    <Button
                        icon={{ icon: FaArrowLeft }}
                        iconPosition="left"
                        size="large"
                        baseUrl="/coffeeShop"
                    >
                        Coffee
                    </Button>
                    <Button
                        icon={{ icon: FaArrowRight }}
                        iconPosition="right"
                        size="large"
                        baseUrl="/bibliotheque"
                    >
                        Librairie
                    </Button>
                </div>
            </Container>

            <div className="relative w-full h-80 overflow-hidden rounded-bl-3xl rounded-tr-3xl">
                <div
                    className="absolute inset-0 opacity-60 h-250"
                    style={{
                        transform: `translateY(${offsetY * -0.2}px)`,
                    }}
                >
                    <Image
                        src={Book}
                        alt="Interlude livre"
                        fill
                        className="object-cover"
                    />
                </div>
                <blockquote className="absolute">
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        color="secondary"
                        className="italic mt-5 ml-5"
                    >
                        &quot;Si chaque librairie est un fabuleux cosmos, alors
                        les livres sont ses étoiles. &quot;
                    </Typo>
                </blockquote>
            </div>
        </>
    );
};
