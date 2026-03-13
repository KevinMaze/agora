"use client";

import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalSection {
    label: string;
    content: ReactNode;
}

interface ModalImage {
    src: ImageProps["src"];
    alt: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
    image?: ModalImage;
    sections?: ModalSection[];
    footer?: ReactNode;
    children?: ReactNode;
    maxWidthClassName?: string;
    contentClassName?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    image,
    sections = [],
    footer,
    children,
    maxWidthClassName = "max-w-5xl",
    contentClassName,
}: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [overlayActive, setOverlayActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [display, setDisplay] = useState({
        title,
        image,
        sections,
        footer,
        children,
        maxWidthClassName,
        contentClassName,
    });

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        setDisplay({
            title,
            image,
            sections,
            footer,
            children,
            maxWidthClassName,
            contentClassName,
        });
    }, [
        isOpen,
        title,
        image,
        sections,
        footer,
        children,
        maxWidthClassName,
        contentClassName,
    ]);

    useEffect(() => {
        let t1: NodeJS.Timeout | undefined;
        let t2: NodeJS.Timeout | undefined;
        let t3: NodeJS.Timeout | undefined;
        let t4: NodeJS.Timeout | undefined;

        if (isOpen) {
            setIsMounted(true);
            setOverlayActive(false);
            setModalActive(false);

            t1 = setTimeout(() => setOverlayActive(true), 10);
            t2 = setTimeout(() => setModalActive(true), 280);
        } else if (isMounted) {
            setModalActive(false);
            t2 = setTimeout(() => setOverlayActive(false), 180);
            t3 = setTimeout(() => setIsMounted(false), 520);
        }

        return () => {
            if (t1) clearTimeout(t1);
            if (t2) clearTimeout(t2);
            if (t3) clearTimeout(t3);
            if (t4) clearTimeout(t4);
        };
    }, [isOpen, isMounted]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div
                className={clsx(
                    "absolute inset-0 bg-black/40 origin-center transition-all duration-300 ease-out",
                    overlayActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0",
                )}
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 h-full w-full overflow-y-auto p-4">
                <div
                    role="dialog"
                    aria-modal="true"
                    className={clsx(
                        "relative bg-background p-8 sm:p-10 rounded-xl w-full mx-auto my-6 max-h-[calc(100vh-3rem)] overflow-y-auto transition-all duration-300 ease-out",
                        modalActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90",
                        display.maxWidthClassName,
                        display.contentClassName,
                    )}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-primary hover:text-secondary"
                        aria-label="Fermer la modale"
                    >
                        <FaTimes size={24} />
                    </button>

                    {display.children ? (
                        display.children
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
                            {display.image && (
                                <div className="relative h-80 md:h-[500px] w-full">
                                    <Image
                                        src={display.image.src}
                                        alt={display.image.alt}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="space-y-5 flex flex-col items-center text-center">
                                {display.title && (
                                    <Typo
                                        variant="title"
                                        component="h2"
                                        weight="bold"
                                        color="primary"
                                        className="uppercase text-3xl underline"
                                    >
                                        {display.title}
                                    </Typo>
                                )}

                                {display.sections.map((section) => (
                                    <div key={section.label}>
                                        <Typo
                                            variant="para"
                                            component="h2"
                                            weight="bold"
                                            color="secondary"
                                            className="mb-2 uppercase"
                                        >
                                            {section.label}
                                        </Typo>
                                        <Typo
                                            variant="para"
                                            component="div"
                                            color="other"
                                        >
                                            {section.content}
                                        </Typo>
                                    </div>
                                ))}

                                {display.footer}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
