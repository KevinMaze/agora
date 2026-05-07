import clsx from "clsx";
import React, { useState } from "react";
import { Typo } from "./typography";

interface StarRatingProps {
    /** La note affichée (pour l'affichage en lecture seule) */
    rating?: number;
    /** Nombre d'étoiles maximum */
    maxStars?: number;
    /** Classe CSS personnalisée */
    className?: string;
    /** Taille des étoiles */
    size?: "small" | "medium" | "large";
    /** Mode interactif (permet de cliquer pour noter) */
    interactive?: boolean;
    /** Callback quand la note change (en mode interactif) */
    onRatingChange?: (rating: number) => void;
    /** Afficher le texte du nombre de votes */
    showVoteCount?: boolean;
    /** Nombre de votes */
    voteCount?: number;
    /** Afficher la note numérique */
    showRatingValue?: boolean;
}

const SIZE_MAP = {
    small: "text-sm sm:text-base",
    medium: "text-xl sm:text-2xl",
    large: "text-2xl sm:text-3xl",
};

export const StarRating: React.FC<StarRatingProps> = ({
    rating = 0,
    maxStars = 5,
    className,
    size = "medium",
    interactive = false,
    onRatingChange,
    showVoteCount = false,
    voteCount = 0,
    showRatingValue = false,
}) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number>(rating);

    const displayRating = interactive && hoverRating !== null ? hoverRating : selectedRating;

    const fullStars = Math.floor(displayRating);
    const halfStar = displayRating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    const handleStarClick = (index: number) => {
        if (!interactive) return;
        const newRating = index + 1;
        setSelectedRating(newRating);
        onRatingChange?.(newRating);
    };

    const handleMouseEnter = (index: number) => {
        if (!interactive) return;
        setHoverRating(index + 1);
    };

    const handleMouseLeave = () => {
        if (!interactive) return;
        setHoverRating(null);
    };

    return (
        <div className={clsx("flex items-center gap-2", className)}>
            <div className="flex items-center">
                {/* Étoiles pleines */}
                {[...Array(fullStars)].map((_, index) => (
                    <span
                        key={`full-${index}`}
                        className={clsx(
                            SIZE_MAP[size],
                            "text-yellow-400",
                            interactive && "cursor-pointer hover:text-yellow-300",
                        )}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        &#9733;
                    </span>
                ))}

                {/* Demi-étoile */}
                {halfStar && (
                    <span
                        className={clsx(
                            SIZE_MAP[size],
                            "text-yellow-400",
                            interactive && "cursor-pointer hover:text-yellow-300",
                        )}
                        onClick={() => handleStarClick(fullStars)}
                        onMouseEnter={() => handleMouseEnter(fullStars)}
                        onMouseLeave={handleMouseLeave}
                    >
                        &#9733;
                    </span>
                )}

                {/* Étoiles vides */}
                {[...Array(emptyStars)].map((_, index) => (
                    <span
                        key={`empty-${index}`}
                        className={clsx(
                            SIZE_MAP[size],
                            "text-other",
                            interactive && "cursor-pointer hover:text-yellow-300",
                        )}
                        onClick={() => handleStarClick(fullStars + (halfStar ? 1 : 0) + index)}
                        onMouseEnter={() => handleMouseEnter(fullStars + (halfStar ? 1 : 0) + index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        &#9734;
                    </span>
                ))}
            </div>

            {/* Texte optionnel */}
            {(showVoteCount || showRatingValue) && (
                <div className="flex items-center gap-1">
                    {showRatingValue && (
                        <Typo variant="para" color="other" className="text-sm font-bold">
                            {selectedRating.toFixed(1)}
                        </Typo>
                    )}
                    {showVoteCount && (
                        <Typo variant="para" color="other" className="text-xs sm:text-sm">
                            ({voteCount} {voteCount > 1 ? "votes" : "vote"})
                        </Typo>
                    )}
                </div>
            )}
        </div>
    );
};
