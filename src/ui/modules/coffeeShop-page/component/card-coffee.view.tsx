"use client";

import { Typo } from "@/ui/design-system/typography";
import { Spinner } from "@/ui/design-system/spinner";
import { StaticImageData } from "next/image";
import Image from "next/image";
import React, { useState } from "react";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut

interface CarProps {
    src?: string | StaticImageData;
    uid: string;
    title?: string;
    type?: string;
    categorie?: string;
    temperature?: string;
    description?: string;
    ingredients?: string[];
    allergènes?: string[];
    price?: string;
    image: string | null;
    alt?: string;
    onClick: () => void;
}

export const CardRecipe: React.FC<CarProps> = ({
    src = DefaultImage,
    alt,
    title,
    description,
    price,
    onClick,
}) => {
    const [imgSrc, setImgSrc] = useState(src);
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
                        alt={title || alt}
                        fill
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
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        color="secondary"
                    >
                        {price}€
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
