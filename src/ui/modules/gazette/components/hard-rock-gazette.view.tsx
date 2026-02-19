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

const getSocialLinks = (concert?: ConcertDocument) => {
    if (!concert) return [];
    return [
        {
            href: concert.facebook,
            label: "Facebook",
            icon: <FaFacebook className="lg:text-2xl text-primary" />,
        },
        {
            href: concert.twitter,
            label: "X",
            icon: <FaXTwitter className="lg:text-2xl text-primary" />,
        },
        {
            href: concert.instagram,
            label: "Instagram",
            icon: <FaInstagram className="lg:text-2xl text-primary" />,
        },
        {
            href: concert.youtube,
            label: "YouTube",
            icon: <FaYoutube className="lg:text-2xl text-primary" />,
        },
        {
            href: concert.tiktok,
            label: "TikTok",
            icon: <FaTiktok className="lg:text-2xl text-primary" />,
        },
    ].filter((item) => !!item.href) as Array<{
        href: string;
        label: string;
        icon: React.ReactNode;
    }>;
};

export const HardRockCoffee = ({ concerts, isLoading }: Props) => {
    const currentConcert = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return concerts
            .map((concert) => ({
                ...concert,
                _concertDate: parseConcertDate(concert.date),
            }))
            .filter(
                (concert) =>
                    concert._concertDate && concert._concertDate >= today,
            )
            .sort(
                (a, b) =>
                    (a._concertDate?.getTime() || 0) -
                    (b._concertDate?.getTime() || 0),
            )[0];
    }, [concerts]);

    const socialLinks = getSocialLinks(currentConcert);
    const dynamicImages = [
        ...(currentConcert?.images || []),
        ...(currentConcert?.image ? [currentConcert.image] : []),
    ].filter(Boolean) as string[];

    return (
        <Container className="mt-50">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="uppercase text-6xl text-center underline mb-10"
            >
                Hard Rock Coffee
            </Typo>
            <Typo
                variant="para"
                components="p"
                weight="normal"
                className="text-center mb-10"
                color="secondary"
            >
                concerts trimestriels (19h/22h)
            </Typo>

            <div className="flex flex-col lg:flex-row bg-foreground rounded-2xl items-center">
                <div className="w-full flex flex-col justify-center mt-15">
                    {isLoading ? (
                        <div className="py-20 flex justify-center">
                            <Spinner size="large" />
                        </div>
                    ) : (
                        <>
                            <Typo
                                variant="para"
                                components="h2"
                                color="secondary"
                                className="text-2xl sm:text-4xl lg:text-6xl uppercase text-center mb-10"
                            >
                                {currentConcert?.title ||
                                    "Aucun concert a venir"}
                            </Typo>
                            <Typo
                                variant="para"
                                components="p"
                                color="other"
                                className="p-4 text-[14px] sm:text-xl"
                            >
                                {currentConcert?.description ||
                                    "Aucun concert programme pour le moment."}
                            </Typo>
                            {socialLinks.length > 0 && (
                                <div className="flex flex-row justify-around mt-5 mb-4">
                                    {socialLinks.map((social) => (
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
                            )}
                        </>
                    )}
                </div>
                {currentConcert && (
                    <div className="w-full relative min-h-[300px] mt-5">
                        <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-10 sm:left-40 -rotate-15 z-1 left-25 top-25">
                            <Image
                                src={dynamicImages[0] || dynamicImages[1]}
                                alt="image du concert"
                                className="rounded-2xl"
                                objectFit="cover"
                                fill
                            />
                        </div>
                        <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-20 sm:left-80 rotate-15 left-45">
                            <Image
                                src={dynamicImages[1] || dynamicImages[1]}
                                alt=""
                                className="rounded-2xl"
                                objectFit="cover"
                                fill
                            />
                        </div>
                        <div className="absolute w-30 sm:w-50 h-30 sm:h-50 sm:bottom-30 left-5">
                            <Image
                                src={dynamicImages[2] || dynamicImages[1]}
                                alt=""
                                className="rounded-2xl"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};
