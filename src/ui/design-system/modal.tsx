"use client";

import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { ReactNode, useEffect } from "react";
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 h-full w-full overflow-y-auto p-4">
                <div
                    role="dialog"
                    aria-modal="true"
                    className={clsx(
                        "relative bg-background p-8 sm:p-10 rounded-xl w-full mx-auto my-6 max-h-[calc(100vh-3rem)] overflow-y-auto",
                        maxWidthClassName,
                        contentClassName,
                    )}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-primary hover:text-secondary"
                        aria-label="Fermer la modale"
                    >
                        <FaTimes size={24} />
                    </button>

                    {children ? (
                        children
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
                            {image && (
                                <div className="relative h-80 md:h-[500px] w-full">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="space-y-5 flex flex-col items-center text-center">
                                {title && (
                                    <Typo
                                        variant="title"
                                        component="h2"
                                        weight="bold"
                                        color="primary"
                                        className="uppercase text-3xl underline"
                                    >
                                        {title}
                                    </Typo>
                                )}

                                {sections.map((section) => (
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

                                {footer}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
