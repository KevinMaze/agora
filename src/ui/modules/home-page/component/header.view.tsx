"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BG from "@/../public/assets/images/IMG_07621.png";
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
                className="absolute inset-0 opacity-30"
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

            {/* Contenu superposé - Le logo est centré et le crack en bas */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                {/* Le mb-20 (margin-bottom) ajuste la position du logo sans affecter le reste */}
                <motion.div
                    className="mb-40"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <Image src={Logo} alt="Logo de L'Agora" className="w-120" />
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="mt-3 uppercase text-center"
                    >
                        {" "}
                        Librairie et Café
                    </Typo>
                </motion.div>
                {/* L'image "déchirée" est maintenant positionnée en bas de manière absolue */}
                <Image
                    src={Crack}
                    alt=""
                    className="absolute bottom-[-1rem] w-full h-60 object-cover rotate-180"
                />
            </div>
        </div>
    );
};
