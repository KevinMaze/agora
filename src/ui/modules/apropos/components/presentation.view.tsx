import { animate, useMotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";

const Images = [
    "/assets/images/01.png",
    "/assets/images/02.png",
    "/assets/images/03.png",
    "/assets/images/04.png",
    "/assets/images/05.png",
];

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
                },
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
        <div className="mt-50">
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
                    {[...Images, ...Images].map((imagePath, index) => (
                        <div
                            key={index}
                            className="w-[200px] h-[200px] relative"
                        >
                            <Image
                                src={imagePath}
                                key={index}
                                alt={imagePath}
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

            <Container className="flex flex-col lg:flex-row items-center justify-center gap-5">
                {/* Section Images */}
                <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[400px] flex justify-center items-center">
                    <div className="absolute h-full w-48 sm:w-60 -rotate-12 left-[calc(50%-10rem)] sm:left-[calc(50%-15rem)]">
                        <Image
                            src="/assets/images/men.jpg"
                            alt="Image d'un homme"
                            className="rounded-lg"
                            priority
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="absolute h-full w-48 sm:w-60 rotate-12 right-[calc(50%-10rem)] sm:right-[calc(50%-15rem)]">
                        <Image
                            src="/assets/images/women.jpg"
                            alt="Image d'une femme"
                            className="rounded-lg"
                            priority
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>

                {/* Section Texte */}
                <div className="w-full lg:w-1/2 bg-foreground/80 rounded-2xl p-5 lg:p-10">
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        color="other"
                        className="text-[14px] sm:text-[16px]"
                    >
                        Nous c’est Jordan et Lavinia, associés dans la vie
                        depuis 2017, et associés en affaires depuis 2024. Dès
                        2014, Jordan nourrit la vision d’une librairie
                        désenclavée, qui sait s’ouvrir au monde et aux gens,
                        sans prendre de grands airs par-dessus ses couvertures
                        pâles et précieuses. C’est ainsi qu’au fil des années
                        est née l’Agora, ce lieu de discussion et d’échanges,
                        une librairie qui s’adapte à tout le monde, et qui
                        s’enrichit de chaque nouvelle interaction. Parce que
                        nous sommes ainsi : nous aimons découvrir, partager,
                        évoluer, sans apriori. Après avoir navigué dans le monde
                        du travail, nous avons décidé de mener notre propre
                        barque, et de nous lancer dans l’aventure. Et si les
                        choses ne sont pas toujours faciles, qu’elles ne sont
                        pas toujours parfaites, elles sont libres d’être
                        recommencées, et d’évoluer, et c’est ce qui était pour
                        nous, le plus important.
                    </Typo>
                </div>
            </Container>
        </div>
    );
};
