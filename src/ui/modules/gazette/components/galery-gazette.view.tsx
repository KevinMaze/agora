import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import Legolas from "@/../public/assets/images/legolas.jpg";
import Drum from "@/../public/assets/images/drums.jpg";
import Monkey from "@/../public/assets/images/monkey.jpg";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { animate, useMotionValue, motion } from "framer-motion";
import { div } from "framer-motion/client";

export const GalleryGazette = () => {
    const Pictures = [
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

    const fastDuration = 25;
    const slowDuration = 75;

    const [duration, setDuration] = useState(fastDuration);

    const [ref, { width }] = useMeasure();

    const xTranslation = useMotionValue(0);

    const [mustFinish, setMustFinish] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        let controls;
        const finalPosition = -width / 2 - 8;

        if (mustFinish) {
            controls = animate(
                xTranslation,
                [xTranslation.get(), finalPosition],
                {
                    ease: "linear",
                    duration:
                        duration * (1 - xTranslation.get() / finalPosition),
                    onComplete: () => {
                        setMustFinish(false);
                        setRerender(!rerender);
                    },
                }
            );
        } else {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }
        return controls.stop;
    }, [xTranslation, width, duration, rerender, mustFinish]);

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
            <div className="relative h-[180px] lg:h-[500px] overflow-hidden py-8 sm:mb-20 sm:mt-20">
                <motion.div
                    className="absolute flex gap-4"
                    ref={ref}
                    style={{ x: xTranslation }}
                    onHoverStart={() => {
                        setMustFinish(true);
                        setDuration(slowDuration);
                    }}
                    onHoverEnd={() => {
                        setMustFinish(true);
                        setDuration(fastDuration);
                    }}
                >
                    {[...Pictures, ...Pictures].map((picture, index) => (
                        <div key={index}>
                            <Image
                                src={picture.src}
                                key={index}
                                alt={picture.alt}
                                className="rounded-2xl min-w-[100px] h-full"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
