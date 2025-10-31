"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut
import { Spinner } from "./spinner";
import { Typo } from "./typography";
import { Button } from "./button";
import { FaArrowRight } from "react-icons/fa6";

interface CarProps {
    src?: string | StaticImageData; // Rendu optionnel pour le cas où elle n'est pas fournie
    alt: string;
    title?: string;
    description?: string;
    autor?: string;
    date?: string;
}

export const Card: React.FC<CarProps> = ({
    src = DefaultImage,
    alt,
    title,
    description,
    autor,
    date,
}: CarProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className="w-60 border-2 border-primary p-4 rounded-bl-3xl rounded-t-3xl">
                <div className="relative h-70 w-50 rounded-bl-3xl rounded-t-3xl overflow-hidden group">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <Image
                        src={imgSrc}
                        alt={alt}
                        className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110  ${
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
                <div className="flex flex-col justify-center items-center mt-4">
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        color="primary"
                        className="uppercase"
                    >
                        {title}
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        color="secondary"
                        className="uppercase mt-4"
                    >
                        {autor}
                    </Typo>
                </div>
                <div className="mt-4 flex justify-center">
                    <Button icon={{ icon: FaArrowRight }}> Voir</Button>
                </div>
            </div>
        </>
    );
};
