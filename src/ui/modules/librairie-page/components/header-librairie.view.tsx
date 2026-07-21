"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BookBox from "@/../public/assets/images/WH15.jpeg";
import { Typo } from "@/ui/design-system/typography";

export const HeaderLibrairie = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Arrière-plan avec opacité et effet de parallaxe */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                }}
            >
                <Image
                    src={BookBox}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center sm:items-start sm:pl-50">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mt-3 uppercase text-center sm:text-left text-2xl sm:text-6xl lg:text-8xl"
                >
                    La
                    <br />
                    boite
                    <br />
                    aux
                    <br />
                    livres
                </Typo>
            </div>
        </div>
    );
};
