"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import DefaultImage from "@/../public/assets/images/404.png"; // Image par défaut
import { Spinner } from "./spinner";
import { Button } from "./button";
import {
    FaArrowRight,
    FaRegStar,
    FaStar,
    FaStarHalfStroke,
} from "react-icons/fa6";

interface CarProps {
    src?: string | StaticImageData; // Rendu optionnel pour le cas où elle n'est pas fournie
    alt?: string;
    title?: string;
    description?: string;
    autor?: string;
    rating?: number;
    date?: string;
    price?: string;
    onAction?: () => void;
}

export const Card: React.FC<CarProps> = ({
    src = DefaultImage,
    title,
    description,
    autor,
    rating,
    onAction,
}: CarProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className="w-72 h-96 border-2 border-primary rounded-bl-3xl rounded-t-3xl overflow-hidden group bg-white/5">
                <div className="relative h-full w-full rounded-bl-3xl rounded-t-3xl overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <Image
                        fill
                        src={imgSrc}
                        alt={`image du livre ${title}`}
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
                    <div className="absolute inset-x-0 bottom-0 h-2/3 translate-y-full opacity-0 transition-all duration-250 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="bg-black/70 backdrop-blur-sm px-3 py-3 h-full">
                            <div className="h-full flex flex-col translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="text-xs font-semibold uppercase text-primary">
                                    {title}
                                </div>
                                <div className="mt-1 text-[10px] uppercase text-secondary">
                                    {autor}
                                </div>
                                <div className="mt-2 flex items-center gap-1">
                                    {[0, 1, 2, 3, 4].map((index) => {
                                        const value =
                                            typeof rating === "number"
                                                ? rating
                                                : 0;
                                        const full =
                                            value >= index + 1 ||
                                            Math.floor(value) >= index + 1;
                                        const half =
                                            !full &&
                                            typeof rating === "number" &&
                                            value >= index + 0.5;
                                        if (full) {
                                            return (
                                                <FaStar
                                                    key={index}
                                                    className="text-primary text-[11px]"
                                                />
                                            );
                                        }
                                        if (half) {
                                            return (
                                                <FaStarHalfStroke
                                                    key={index}
                                                    className="text-primary text-[11px]"
                                                />
                                            );
                                        }
                                        return (
                                            <FaRegStar
                                                key={index}
                                                className="text-secondary/40 text-[11px]"
                                            />
                                        );
                                    })}
                                    {typeof rating === "number" && (
                                        <span className="ml-1 text-[10px] text-primary">
                                            {rating.toFixed(1)}
                                        </span>
                                    )}
                                </div>
                                {description && (
                                    <p
                                        className="text-[11px] leading-snug mt-2 overflow-hidden text-white/90"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 5,
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {description}
                                    </p>
                                )}
                                <div className="mt-auto pt-2 flex justify-center">
                                    <Button
                                        icon={{ icon: FaArrowRight }}
                                        action={onAction}
                                    >
                                        Voir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
