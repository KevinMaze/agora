import { animate, useMotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import Img01 from "@/../public/assets/images/01.png";
import Img02 from "@/../public/assets/images/02.png";
import Img03 from "@/../public/assets/images/03.png";
import Img04 from "@/../public/assets/images/04.png";
import Img05 from "@/../public/assets/images/05.png";
import Image from "next/image";
import { div } from "framer-motion/client";
import { Container } from "@/ui/components/container";

const Images = [Img01, Img02, Img03, Img04, Img05];

export const AproposPresentationView = () => {
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
        <div className="mt-20">
            <div className="relative h-[500px] w-full overflow-hidden py-8">
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
                    {[...Images, ...Images].map((event, index) => (
                        <div
                            key={index}
                            className="w-[200px] h-[200px] relative"
                        >
                            <Image
                                src={event.src}
                                key={index}
                                alt={event.src}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                priority
                                className="rounded-2xl"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            <Container>sdvcsdv</Container>
        </div>
    );
};
