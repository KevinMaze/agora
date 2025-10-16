import { Typo } from "@/ui/design-system/typography";
import Coffee from "@/../public/assets/images/coffee.jpg";
import Stairway from "@/../public/assets/images/stairway.jpg";
import Event from "@/../public/assets/images/07571.png";
import { Card } from "./card";
import useMeasure from "react-use-measure";
import { animate } from "framer-motion";
import { motion } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

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

    const [ref, { width }] = useMeasure();

    const xTranslation = useMotionValue(0);

    useEffect(() => {
        const finalPosition = -width / 2 - 8;

        const controls = animate(xTranslation, [0, finalPosition], {
            ease: "linear",
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        });
        return controls.stop();
    }, [xTranslation, width]);

    return (
        <>
            <div className="mt-80 mb-80 flex flex-col items-center">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mb-20 uppercase underline tracking-widest"
                >
                    Evènements
                </Typo>
                <div className="mb-20 py-8">
                    <motion.div
                        className="absolute left-0 flex gap-4"
                        ref={ref}
                        style={{ x: xTranslation }}
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
            </div>
        </>
    );
};
