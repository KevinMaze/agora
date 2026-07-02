"use client";

import { getEvenements } from "@/api/evenements";
import { EvenementDocument } from "@/types/evenement";
import { Typo } from "@/ui/design-system/typography";
import { Card } from "./card";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";
import { Spinner } from "@/ui/design-system/spinner";
import ErrorImage from "@/../public/assets/images/404.png";
import { toast } from "react-toastify";
import { ModalEvenement } from "@/ui/design-system/modal-evenement";

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
            .slice(0, eventsLimit);
    }, [eventsFromDb, eventsLimit]);

    const [selectedEvent, setSelectedEvent] =
        useState<EvenementDocument | null>(null);

    const fastDuration = 25;
    /** Vitesse relative appliquée au survol (1 = normale, plus petit = plus lent). */
    const hoverSpeedFactor = 0.3;

    const [viewportRef, { width: viewportWidth }] = useMeasure();
    const [setRef, { width: singleSetWidth }] = useMeasure();

    const xTranslation = useMotionValue(0);
    const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

    const repeatCount = useMemo(() => {
        if (events.length === 0) return 0;
        if (!viewportWidth || !singleSetWidth) return 2;

        const minTrackWidth = viewportWidth * 2;
        return Math.max(2, Math.ceil(minTrackWidth / singleSetWidth) + 1);
    }, [events.length, viewportWidth, singleSetWidth]);

    // Anime la translation en boucle infinie. On ne recrée l'animation que
    // lorsque la largeur d'un set change — le survol/la modale se contentent
    // d'ajuster `speed`/`pause` sur l'animation en cours pour ne jamais la
    // réinitialiser à sa position de départ.
    useEffect(() => {
        if (events.length === 0 || singleSetWidth === 0) return;

        xTranslation.set(0);
        const finalPosition = -singleSetWidth;

        const controls = animate(xTranslation, [0, finalPosition], {
            ease: "linear",
            duration: fastDuration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        });
        controlsRef.current = controls;

        return controls.stop;
    }, [xTranslation, singleSetWidth, events.length]);

    // Met en pause le carrousel tant que la modale de détail est ouverte,
    // et le relance à la fermeture, sans toucher à sa position.
    useEffect(() => {
        if (!controlsRef.current) return;

        if (selectedEvent) {
            controlsRef.current.pause();
        } else {
            controlsRef.current.play();
        }
    }, [selectedEvent]);

    const handleHoverStart = () => {
        if (controlsRef.current) controlsRef.current.speed = hoverSpeedFactor;
    };
    const handleHoverEnd = () => {
        if (controlsRef.current) controlsRef.current.speed = 1;
    };

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
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                    >
                        {Array.from({ length: repeatCount }).map((_, group) => (
                            <div
                                key={`event-group-${group}`}
                                ref={group === 0 ? setRef : undefined}
                                className="flex gap-4 pr-4"
                            >
                                {events.map((event, index) => (
                                    <Card
                                        image={event.image || ErrorImage}
                                        key={`${group}-${index}`}
                                        alt={event.title || "Événement Agora"}
                                        title={event.title || "Événement"}
                                        onClick={() => setSelectedEvent(event)}
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

            <ModalEvenement
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />
        </div>
    );
};
