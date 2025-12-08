import { animate, useMotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import Img01 from "@/../public/assets/images/01.png";
import Img02 from "@/../public/assets/images/02.png";
import Img03 from "@/../public/assets/images/03.png";
import Img04 from "@/../public/assets/images/04.png";
import Img05 from "@/../public/assets/images/05.png";
import Men from "@/../public/assets/images/men.jpg";
import Women from "@/../public/assets/images/women.jpg";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";

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

            <Container className="flex flex-col lg:flex-row items-center justify-center gap-5">
                {/* Section Images */}
                <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[400px] flex justify-center items-center">
                    <div className="absolute h-full w-48 sm:w-60 -rotate-12 left-[calc(50%-10rem)] sm:left-[calc(50%-15rem)]">
                        <Image
                            src={Men}
                            alt="Image d'un homme"
                            className="rounded-lg"
                            priority
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="absolute h-full w-48 sm:w-60 rotate-12 right-[calc(50%-10rem)] sm:right-[calc(50%-15rem)]">
                        <Image
                            src={Women}
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
                        Quod opera consulta cogitabatur astute, ut hoc
                        insidiarum genere Galli periret avunculus, ne eum ut
                        praepotens acueret in fiduciam exitiosa coeptantem.
                        verum navata est opera diligens hocque dilato Eusebius
                        praepositus cubiculi missus est Cabillona aurum secum
                        perferens, quo per turbulentos seditionum concitores
                        occultius distributo et tumor consenuit militum et salus
                        est in tuto locata praefecti. deinde cibo abunde perlato
                        castra die praedicto sunt mota. Quod opera consulta
                        cogitabatur astute, ut hoc insidiarum genere Galli
                        periret avunculus, ne eum ut praepotens acueret in
                        fiduciam exitiosa coeptantem. verum navata est opera
                        diligens hocque dilato Eusebius praepositus cubiculi
                        missus est Cabillona aurum secum perferens, quo per
                        turbulentos seditionum concitores occultius distributo
                        et tumor consenuit militum et salus est in tuto locata
                        praefecti. deinde cibo abunde perlato castra die
                        praedicto sunt mota.
                    </Typo>
                </div>
            </Container>
        </div>
    );
};
