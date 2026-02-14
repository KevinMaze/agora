"use client";

import { EvenementDocument } from "@/types/evenement";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import ErrorImage from "@/../public/assets/images/404.png";
import { Spinner } from "@/ui/design-system/spinner";
import { useMemo } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
    evenements: EvenementDocument[];
    isLoading: boolean;
}

type SocialLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const parseEventDate = (value?: string) => {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
};

const formatDate = (value?: string) => {
    const parsed = parseEventDate(value);
    if (!parsed) return "Date non renseignée";
    return parsed.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const getSocialLinks = (event: EvenementDocument): SocialLink[] => {
    const links: SocialLink[] = [];

    if (event.facebook) {
        links.push({
            href: event.facebook,
            label: "Facebook",
            icon: <FaFacebook className="text-xl text-primary" />,
        });
    }
    if (event.twitter) {
        links.push({
            href: event.twitter,
            label: "X",
            icon: <FaXTwitter className="text-xl text-primary" />,
        });
    }
    if (event.instagram) {
        links.push({
            href: event.instagram,
            label: "Instagram",
            icon: <FaInstagram className="text-xl text-primary" />,
        });
    }
    if (event.youtube) {
        links.push({
            href: event.youtube,
            label: "YouTube",
            icon: <FaYoutube className="text-xl text-primary" />,
        });
    }
    if (event.tiktok) {
        links.push({
            href: event.tiktok,
            label: "TikTok",
            icon: <FaTiktok className="text-xl text-primary" />,
        });
    }

    return links;
};

const SocialLinks = ({ event }: { event: EvenementDocument }) => {
    const links = getSocialLinks(event);
    if (links.length === 0) return null;

    return (
        <div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start mt-4">
            {links.map((social) => (
                <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="hover:opacity-75 transition-opacity"
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
};

export const EvenementGazette = ({ evenements, isLoading }: Props) => {
    const { currentEvent, upcomingEvents } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const valid = evenements
            .map((event) => ({
                ...event,
                _eventDate: parseEventDate(event.date),
            }))
            .filter((event) => event._eventDate && event._eventDate >= today)
            .sort(
                (a, b) =>
                    (a._eventDate?.getTime() || 0) -
                    (b._eventDate?.getTime() || 0),
            );

        return {
            currentEvent: valid[0] || null,
            upcomingEvents: valid.slice(1),
        };
    }, [evenements]);

    return (
        <div className="m-10">
            <div className="p-3 bg-foreground h-full rounded-lg shadow-lg lg:max-w-8xl flex flex-col justify-center items-center xl:flex-row xl:items-start xl:justify-around">
                {isLoading ? (
                    <div className="py-20">
                        <Spinner size="large" />
                    </div>
                ) : (
                    <>
                        <div className="w-full xl:w-[45%]">
                            <Typo
                                variant="para"
                                component="h1"
                                weight="extrabold"
                                className="uppercase sm:text-3xl lg:text-4xl underline text-center sm:text-start"
                            >
                                En ce moment
                            </Typo>

                            {!currentEvent ? (
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                    className="mt-8 text-center sm:text-start"
                                >
                                    Aucun événement à venir.
                                </Typo>
                            ) : (
                                <>
                                    <Typo
                                        variant="para"
                                        component="h2"
                                        weight="bold"
                                        className="uppercase mt-6 text-center sm:text-start sm:text-2xl"
                                    >
                                        {currentEvent.title || "Sans titre"}
                                    </Typo>
                                    <Typo
                                        variant="para"
                                        component="p"
                                        weight="normal"
                                        color="secondary"
                                        className="text-center sm:text-start sm:text-xl mt-2 uppercase"
                                    >
                                        {formatDate(currentEvent.date)}
                                    </Typo>
                                    <div className="w-full mt-5">
                                        <div className="relative w-full h-[300px] sm:h-[380px]">
                                            <Image
                                                src={
                                                    currentEvent.image ||
                                                    ErrorImage
                                                }
                                                alt={
                                                    currentEvent.title ||
                                                    "Événement"
                                                }
                                                fill
                                                className="rounded-2xl object-cover"
                                            />
                                        </div>
                                        <SocialLinks event={currentEvent} />
                                    </div>
                                    <div className="mt-8 w-full">
                                        <Typo
                                            variant="para"
                                            component="p"
                                            color="other"
                                            className="text-justify text-[14px] sm:text-xl"
                                        >
                                            {currentEvent.description ||
                                                "Aucune description disponible."}
                                        </Typo>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="p-5 h-full w-full xl:w-[45%] mt-10 xl:mt-0">
                            <Typo
                                variant="para"
                                component="h1"
                                weight="extrabold"
                                className="uppercase sm:text-3xl lg:text-4xl underline text-center"
                            >
                                Prochainement
                            </Typo>

                            {upcomingEvents.length === 0 ? (
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                    className="mt-8 text-center"
                                >
                                    Pas d'autres événements programmés.
                                </Typo>
                            ) : (
                                <div className="flex flex-col gap-10 mt-10">
                                    {upcomingEvents.map((event, index) => (
                                        <div
                                            key={event.id || index}
                                            className="flex flex-row justify-center sm:justify-start items-start gap-4"
                                        >
                                            <div className="relative w-40 h-40 sm:w-52 sm:h-52 shrink-0">
                                                <Image
                                                    src={event.image || ErrorImage}
                                                    alt={event.title || "Événement"}
                                                    fill
                                                    className="rounded-2xl object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-between min-h-40 sm:min-h-52">
                                                <Typo
                                                    variant="para"
                                                    component="h2"
                                                    weight="extrabold"
                                                    className="uppercase text-[14px] sm:text-2xl"
                                                >
                                                    {event.title || "Sans titre"}
                                                </Typo>
                                                <Typo
                                                    variant="para"
                                                    component="p"
                                                    weight="bold"
                                                    color="secondary"
                                                    className="uppercase text-[14px] sm:text-xl mt-2"
                                                >
                                                    {formatDate(event.date)}
                                                </Typo>
                                                <SocialLinks event={event} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="border-1 border-primary w-60 sm:w-180 lg:w-250 m-auto mt-10" />
        </div>
    );
};
