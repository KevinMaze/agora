"use client";

import { getEvenements } from "@/api/evenements";
import { EvenementDocument } from "@/types/evenement";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "./card";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";
import { Spinner } from "@/ui/design-system/spinner";
import ErrorImage from "@/../public/assets/images/404.png";
import { toast } from "react-toastify";

interface Props {
    eventsLimit?: number;
}

const parseEventDate = (value?: string) => {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
};

export const EvenementView = ({ eventsLimit = 5 }: Props) => {
    const [eventsFromDb, setEventsFromDb] = useState<EvenementDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvenements = async () => {
            setIsLoading(true);
            try {
                const data = await getEvenements();
                setEventsFromDb(data);
            } catch (error) {
                console.error("Erreur de chargement des événements:", error);
                toast.error("Impossible de charger les événements.");
                setEventsFromDb([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvenements();
    }, []);

    const events = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return eventsFromDb
            .map((event) => ({
                ...event,
                _eventDate: parseEventDate(event.date),
            }))
            .filter((event) => event._eventDate && event._eventDate >= today)
            .sort(
                (a, b) =>
                    (a._eventDate?.getTime() || 0) -
                    (b._eventDate?.getTime() || 0),
            )
            .slice(0, eventsLimit)
            .map((event) => ({
                src: event.image || ErrorImage,
                alt: event.title || "Événement Agora",
                title: event.title || "Événement",
            }));
    }, [eventsFromDb, eventsLimit]);

    const fastDuration = 25;
    const slowDuration = 75;

    const [duration, setDuration] = useState(fastDuration);

    const [viewportRef, { width: viewportWidth }] = useMeasure();
    const [setRef, { width: singleSetWidth }] = useMeasure();

    const xTranslation = useMotionValue(0);

    const [mustFinish, setMustFinish] = useState(false);
    const [rerender, setRerender] = useState(false);

    const repeatCount = useMemo(() => {
        if (events.length === 0) return 0;
        if (!viewportWidth || !singleSetWidth) return 2;

        const minTrackWidth = viewportWidth * 2;
        return Math.max(2, Math.ceil(minTrackWidth / singleSetWidth) + 1);
    }, [events.length, viewportWidth, singleSetWidth]);

    useEffect(() => {
        if (events.length === 0 || singleSetWidth === 0) return;

        xTranslation.set(0);
        let controls;
        const finalPosition = -singleSetWidth;

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
    }, [
        xTranslation,
        singleSetWidth,
        duration,
        rerender,
        mustFinish,
        events.length,
    ]);

    return (
        <div className="mt-60 mb-20 flex flex-col justify-center">
            <Typo
                variant="title"
                component="h1"
                weight="bold"
                className="mb-20 uppercase underline lg:text-end text-center lg:mr-20 text-2xl sm:text-4xl lg:text-5xl tracking-wider underline-offset-8"
            >
                Evènements
            </Typo>
            {/* Ce conteneur a maintenant une hauteur définie par les cartes à l'intérieur */}
            <div
                ref={viewportRef}
                className="relative lg:h-[500px] sm:h-[400px] h-[300] w-full overflow-hidden py-8"
            >
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Spinner size="large" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center px-4">
                        <Typo
                            variant="para"
                            component="p"
                            className="text-center sm:text-xl"
                        >
                            Aucun événement à venir pour le moment.
                        </Typo>
                    </div>
                ) : (
                    <motion.div
                        className="absolute flex"
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
                        {Array.from({ length: repeatCount }).map((_, group) => (
                            <div
                                key={`event-group-${group}`}
                                ref={group === 0 ? setRef : undefined}
                                className="flex gap-4 pr-4"
                            >
                                {events.map((event, index) => (
                                    <Card
                                        image={event.src}
                                        key={`${group}-${index}`}
                                        alt={event.alt}
                                        title={event.title}
                                    />
                                ))}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
            <div className="items-center flex justify-center">
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
        </div>
    );
};
