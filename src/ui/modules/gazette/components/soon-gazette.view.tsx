"use client";

import { ConcertDocument } from "@/types/concert";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Spinner } from "@/ui/design-system/spinner";
import { useMemo } from "react";

interface Props {
    concerts: ConcertDocument[];
    isLoading: boolean;
}

const parseConcertDate = (value?: string) => {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
};

const formatDate = (value?: string) => {
    const parsed = parseConcertDate(value);
    if (!parsed) return "Date non renseignee";
    return parsed.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const getSocialLinks = (concert?: ConcertDocument) => {
    if (!concert) return [];
    return [
        {
            href: concert.facebook,
            label: "Facebook",
            icon: <FaFacebook className="text-xl text-primary" />,
        },
        {
            href: concert.twitter,
            label: "X",
            icon: <FaXTwitter className="text-xl text-primary" />,
        },
        {
            href: concert.instagram,
            label: "Instagram",
            icon: <FaInstagram className="text-xl text-primary" />,
        },
        {
            href: concert.youtube,
            label: "YouTube",
            icon: <FaYoutube className="text-xl text-primary" />,
        },
        {
            href: concert.tiktok,
            label: "TikTok",
            icon: <FaTiktok className="text-xl text-primary" />,
        },
    ].filter((item) => !!item.href) as Array<{
        href: string;
        label: string;
        icon: React.ReactNode;
    }>;
};

export const SoonGazette = ({ concerts, isLoading }: Props) => {
    const upcomingConcerts = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return concerts
            .map((concert) => ({
                ...concert,
                _concertDate: parseConcertDate(concert.date),
            }))
            .filter((concert) => concert._concertDate && concert._concertDate >= today)
            .sort(
                (a, b) =>
                    (a._concertDate?.getTime() || 0) -
                    (b._concertDate?.getTime() || 0),
            )
            .slice(1, 4);
    }, [concerts]);

    const cards = Array.from({ length: 3 }, (_, index) => ({
        concert: upcomingConcerts[index],
    }));

    return (
        <Container className="mb-40">
            <Typo
                variant="para"
                components="h2"
                weight="bold"
                className="mb-20 mt-20 uppercase text-4xl sm:text-6xl sm:text-end text-center"
            >
                Prochainement
            </Typo>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 justify-items-center">
                {isLoading ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 py-10 flex justify-center">
                        <Spinner size="large" />
                    </div>
                ) : upcomingConcerts.length === 0 ? (
                    <Typo
                        variant="para"
                        components="p"
                        color="other"
                        className="col-span-1 md:col-span-2 lg:col-span-3 text-center"
                    >
                        Aucun concert programme pour le moment.
                    </Typo>
                ) : (
                    cards.map(({ concert }, index) => {
                        const imageList = [
                            ...(concert?.images || []),
                            ...(concert?.image ? [concert.image] : []),
                        ].filter(Boolean) as string[];
                        const imageSrc = imageList[0];
                        const socialLinks = getSocialLinks(concert);

                        return (
                            <div key={concert?.id || `soon-${index}`}>
                                <Typo
                                    variant="para"
                                    components="p"
                                    weight="bold"
                                    color="secondary"
                                    className="text-xl uppercase"
                                >
                                    {concert?.date ? formatDate(concert.date) : "date"}
                                </Typo>
                                <div className="mt-10 relative">
                                    <Typo
                                        variant="para"
                                        components="p"
                                        className="absolute pl-5 uppercase mt-5 z-1"
                                    >
                                        {concert?.title || "Name"}
                                    </Typo>
                                    {imageSrc && (
                                        <div className="w-80 h-80 relative overflow-hidden rounded-2xl">
                                            <Image
                                                src={imageSrc}
                                                alt={concert?.title || "Concert"}
                                                fill
                                                className="opacity-30 object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-row justify-around mt-5">
                                    {socialLinks.length === 0 ? (
                                        <>
                                            <FaFacebook className="text-xl text-primary" />
                                            <FaXTwitter className="text-xl text-primary" />
                                            <FaInstagram className="text-xl text-primary" />
                                            <FaYoutube className="text-xl text-primary" />
                                            <FaTiktok className="text-xl text-primary" />
                                        </>
                                    ) : (
                                        socialLinks.map((social) => (
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
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Container>
    );
};
