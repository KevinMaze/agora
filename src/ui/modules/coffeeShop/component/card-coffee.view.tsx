"use client";

import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";
import { StaticImageData } from "next/image";
import Image from "next/image";
import React, { useState } from "react";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut
import Link from "next/link";

interface CarProps {
    image?: string | StaticImageData; // Rendu optionnel pour le cas où elle n'est pas fournie
    alt: string;
    title?: string;
    description: string;
    onClick: () => void;
}

export const CardRecipe: React.FC<CarProps> = ({
    image = DefaultImage,
    alt,
    title,
    description,
    onClick,
}) => {
    const [imgSrc, setImgSrc] = useState(image);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className="w-60 cursor-pointer" onClick={onClick}>
                {/* J'ai ajouté un groupe pour le survol et overflow-hidden pour contenir le zoom */}
                <div className="relative h-60 w-60 rounded-3xl overflow-hidden group">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <Image
                        src={imgSrc}
                        alt={alt}
                        className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 ${
                            isLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoadingComplete={() => setIsLoading(false)}
                        onError={() => {
                            setImgSrc(DefaultImage);
                            setIsLoading(false);
                        }}
                        placeholder="blur"
                        blurDataURL={
                            typeof imgSrc === "string"
                                ? imgSrc
                                : imgSrc.blurDataURL
                        }
                    />
                </div>
                <div className="mt-5">
                    <Typo
                        variant="para"
                        components="h2"
                        weight="bold"
                        color="secondary"
                        className="uppercase"
                    >
                        {title}
                    </Typo>
                    <div className="border-1 border-primary w-[80%] mt-4 mb-4"></div>
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        color="secondary"
                    >
                        {description}
                    </Typo>
                </div>
            </div>
        </>
    );
};
