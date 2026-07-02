"use client";

/**
 * ModalEvenement — modale de détail d'un événement.
 *
 * S'appuie sur le composant `Modal` générique du design system pour garder
 * la même mise en page/animations que les autres modales (ex: livre).
 */
import { EvenementDocument } from "@/types/evenement";
import ErrorImage from "@/../public/assets/images/404.png";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ReactNode } from "react";
import { Modal } from "./modal";

interface ModalEvenementProps {
    isOpen: boolean;
    onClose: () => void;
    event: EvenementDocument | null;
}

type SocialLink = {
    href: string;
    label: string;
    icon: ReactNode;
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
            icon: <FaFacebook className="text-xl" />,
        });
    }
    if (event.twitter) {
        links.push({
            href: event.twitter,
            label: "X",
            icon: <FaXTwitter className="text-xl" />,
        });
    }
    if (event.instagram) {
        links.push({
            href: event.instagram,
            label: "Instagram",
            icon: <FaInstagram className="text-xl" />,
        });
    }
    if (event.youtube) {
        links.push({
            href: event.youtube,
            label: "YouTube",
            icon: <FaYoutube className="text-xl" />,
        });
    }
    if (event.tiktok) {
        links.push({
            href: event.tiktok,
            label: "TikTok",
            icon: <FaTiktok className="text-xl" />,
        });
    }

    return links;
};

export const ModalEvenement = ({
    isOpen,
    onClose,
    event,
}: ModalEvenementProps) => {
    const socialLinks = event ? getSocialLinks(event) : [];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={event?.title || "Événement"}
            image={{
                src: event?.image || ErrorImage,
                alt: event?.title || "Événement",
            }}
            sections={[
                { label: "Date", content: formatDate(event?.date) },
                {
                    label: "Description",
                    content:
                        event?.description || "Aucune description disponible.",
                },
            ]}
            footer={
                socialLinks.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="text-primary hover:opacity-75 transition-opacity"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                ) : undefined
            }
        />
    );
};
