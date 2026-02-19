"use client";

import { GalleryDocument } from "@/api/gallery";
import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import Legolas from "@/../public/assets/images/legolas.jpg";
import Drum from "@/../public/assets/images/drums.jpg";
import Monkey from "@/../public/assets/images/monkey.jpg";
import { useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";

interface Props {
    galleryImages: GalleryDocument[];
    isLoading: boolean;
}

export const GalleryGazette = ({ galleryImages, isLoading }: Props) => {
    const fallbackPictures = [
        {
            src: Legolas,
            alt: "Legolas",
        },
        {
            src: Drum,
            alt: "Drum",
        },
        {
            src: Monkey,
            alt: "Monkay",
        },
    ];

    const dynamicPictures = galleryImages
        .map((item, index) => ({
            src: item.image || "",
            alt: `Gallery ${index + 1}`,
        }))
        .filter((item) => !!item.src);

    const Pictures =
        !isLoading && dynamicPictures.length > 0
            ? dynamicPictures
            : fallbackPictures;

    const duration = 25;

    const [viewportRef, { width: viewportWidth }] = useMeasure();
    const [setRef, { width: singleSetWidth }] = useMeasure();

    const xTranslation = useMotionValue(0);

    const repeatCount = useMemo(() => {
        if (Pictures.length === 0) return 0;
        if (!viewportWidth || !singleSetWidth) return 2;

        const minTrackWidth = viewportWidth * 2;
        return Math.max(2, Math.ceil(minTrackWidth / singleSetWidth) + 1);
    }, [Pictures.length, viewportWidth, singleSetWidth]);

    useEffect(() => {
        xTranslation.set(0);
    }, [singleSetWidth, xTranslation]);

    useEffect(() => {
        if (Pictures.length === 0 || singleSetWidth === 0) return;

        const controls = animate(xTranslation, [0, -singleSetWidth], {
            ease: "linear",
            duration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        });

        return controls.stop;
    }, [Pictures.length, singleSetWidth, xTranslation]);

    return (
        <div className="mt-20 lg:mt-50">
            <Container>
                <Typo
                    variant="para"
                    components="h2"
                    weight="bold"
                    className="uppercase text-4xl sm:text-6xl text-center sm:text-start"
                >
                    Gallery
                </Typo>
            </Container>
            <div
                ref={viewportRef}
                className="relative h-[250px] lg:h-[500px] overflow-hidden py-8 sm:mb-20 sm:mt-20"
            >
                <motion.div
                    className="absolute flex"
                    style={{ x: xTranslation }}
                >
                    {Array.from({ length: repeatCount }).map((_, group) => (
                        <div
                            key={`gallery-group-${group}`}
                            ref={group === 0 ? setRef : undefined}
                            className="flex gap-4 pr-4"
                        >
                            {Pictures.map((picture, index) => (
                                <div key={`gallery-picture-${group}-${index}`}>
                                    <Image
                                        src={picture.src}
                                        width={"320"}
                                        height={"1"}
                                        alt={picture.alt}
                                        className="rounded-2xl min-w-[120px] sm:min-w-[220px] lg:min-w-[220px] h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
