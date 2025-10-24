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
            <Container className="mb-80 relative">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mt-20 mb-20 uppercase underline tracking-widest"
                >
                    Présentation Rapide
                </Typo>

                <div className="flex justify-center items-center h-100 mb-20 mt-60">
                    <div className="bg-foreground/60 backdrop-blur-sm text-center rounded-l-3xl">
                        <Typo
                            variant="para"
                            components="p"
                            weight="normal"
                            className="text-center rounded-l-3xl p-25"
                            color="other"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam eget sapien quis diam scelerisque
                            aliquam. Phasellus rhoncus tellus at dapibus
                            volutpat. Mauris sit amet velit vitae metus luctus
                            convallis. Quisque sed vulputate mi, a gravida
                            turpis. Maecenas non libero vel neque semper
                            ullamcorper et porta dui. Suspendisse ut sagittis
                            velit. Etiam eu lobortis lectus. Mauris a tortor
                            malesuada, accumsan enim sollicitudin, vestibulum
                            ipsum. Mauris aliquam pretium metus eu cursus.
                            Curabitur nibh quam, dignissim ac justo ut, egestas
                            elementum arcu.
                        </Typo>
                    </div>
                    <Image
                        src={Stairway}
                        alt="Stairway"
                        className="w-lg shadow-[var(--myshadow)] rounded-tr-3xl border-1 border-primary"
                    />
                </div>
                <Image
                    src={Coffee}
                    alt="Coffee"
                    className="w-lg shadow-[var(--myshadow)] rounded-bl-3xl absolute -z-1 border-1 border-primary"
                    style={{
                        transform: `translateY(${
                            offsetY * -0.1
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
                        Coffee Shop
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

            <div className="mb-20 relative w-full h-80 overflow-hidden rounded-bl-3xl rounded-tr-3xl">
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
                        className="italic"
                    >
                        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.&quot;
                    </Typo>
                </blockquote>
            </div>
        </>
    );
};
