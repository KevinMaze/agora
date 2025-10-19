import { Typo } from "@/ui/design-system/typography";
import Coffee from "@/../public/assets/images/coffee.jpg";
import Stairway from "@/../public/assets/images/stairway.jpg";
import Event from "@/../public/assets/images/07571.png";
import { Card } from "./card";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";

export const EvenementView = () => {
    // Données en dur pour le carrousel.
    // À l'avenir, vous pourrez remplacer ceci par un appel à votre API.
    const events = [
        {
            src: Event,
            alt: "Atelier d'écriture créative",
            title: "Atelier d'écriture",
        },
        { src: Coffee, alt: "Dégustation de café", title: "Dégustation" },
        { src: Stairway, alt: "Rencontre avec un auteur", title: "Rencontre" },
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
        <div className="mt-80 mb-20 flex flex-col justify-center items-center ">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mb-20 uppercase underline tracking-widest text-center"
            >
                Evènements
            </Typo>
            {/* Ce conteneur a maintenant une hauteur définie par les cartes à l'intérieur */}
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
                    {[...events, ...events].map((event, index) => (
                        <Card
                            image={event.src}
                            key={index}
                            alt={event.title}
                            title={event.title}
                        />
                    ))}
                </motion.div>
            </div>
            <Button
                variant="primary"
                size="large"
                icon={{ icon: FaArrowRight }}
                iconPosition="right"
                baseUrl="/gazette"
            >
                Evènements
            </Button>
        </div>
    );
};
