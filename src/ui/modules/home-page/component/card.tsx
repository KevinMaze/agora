import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { StaticImageData } from "next/image";

interface CardProps {
    image: string | StaticImageData;
    alt: string;
    title: string;
}

export const Card: React.FC<CardProps> = ({ image, alt, title }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <motion.div
            className="relative min-w-[300px] h-[400px] flex justify-center items-center"
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="absolute inset-0 z-10 flex justify-center items-center rounded-3xl backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Typo
                            variant="para"
                            components="h2"
                            weight="bold"
                            className="text-center uppercase text-3xl"
                        >
                            {title}
                        </Typo>
                    </motion.div>
                )}
            </AnimatePresence>
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover rounded-3xl"
            />
        </motion.div>
    );
};
