"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BG from "@/../public/assets/images/04.png";
import Logo from "@/../public/assets/images/icon-agora.png";
import Crack from "@/../public/assets/images/déchiré.png";
import { Typo } from "@/ui/design-system/typography";

export const Header = () => {
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
                    src={BG}
                    alt="Arrière-plan du coffee shop Agora"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <motion.div
                    className="mb-40"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <Image
                        src={Logo}
                        alt="Logo de L'Agora"
                        className="w-60 sm:w-80 lg:w-120"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.7, ease: "easeInOut" }}
                    >
                        <Typo
                            variant="title"
                            components="h1"
                            weight="bold"
                            className="mt-3 uppercase text-center text-2xl sm:text-4xl lg:text-5xl"
                        >
                            {" "}
                            Librairie et Café
                        </Typo>
                    </motion.div>
                </motion.div>
                {/* L'image "déchirée" est maintenant positionnée en bas de manière absolue */}
                <Image
                    src={Crack}
                    alt=""
                    className="absolute bottom-[-2rem] sm:bottom-[-1rem] w-full h-60 object-cover rotate-180"
                />
            </div>
        </div>
    );
};
