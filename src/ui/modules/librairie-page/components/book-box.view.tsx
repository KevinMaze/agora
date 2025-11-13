"use client";

import { useState, useRef, createRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typo } from "@/ui/design-system/typography";
import Dune from "@/../public/assets/images/dune.jpg";
/* import Foundation from "@/../public/assets/images/foundation.jpg";
import Hyperion from "@/../public/assets/images/hyperion.jpg"; */
import { LikeBookBoxView } from "./like-bookbox.view";
import { Book } from "./book.view";

const booksData = [
    {
        id: 1,
        title: "Dune",
        src: Dune,
        alt: "Couverture du livre Dune",
        publicationDate: "1965",
        author: "Frank Herbert",
        synopsis:
            "L'histoire se déroule dans un futur lointain au sein d'un vaste empire interstellaire. Dune raconte l'histoire du jeune Paul Atreides, dont la famille noble se voit confier la gestion de la planète désertique Arrakis. Unique source de la substance la plus précieuse de l'univers, l'épice, le contrôle d'Arrakis est un honneur convoité et dangereux. Le roman explore des thèmes de politique, de religion et d'écologie alors que Paul navigue dans un réseau complexe d'intrigues et de trahisons pour accomplir son destin.",
    },
    {
        id: 2,
        title: "Fondation",
        src: Dune,
        alt: "Couverture du livre Fondation",
        publicationDate: "1951",
        author: "Isaac Asimov",
        synopsis:
            "L'Empire Galactique, qui règne sur la galaxie depuis des milliers d'années, est au bord de l'effondrement. Le psychohistorien Hari Seldon, qui a développé une science permettant de prédire l'avenir à grande échelle, crée deux Fondations aux extrémités de la galaxie pour préserver le savoir humain et réduire la période de barbarie à venir.",
    },
    {
        id: 3,
        title: "Hyperion",
        src: Dune,
        alt: "Couverture du livre Hyperion",
        publicationDate: "1989",
        author: "Dan Simmons",
        synopsis:
            "Sur la planète Hypérion, au-delà du réseau de portails de l'Hégémonie de l'Homme, attend le Gritche, une créature énigmatique et redoutée. À la veille de l'Armageddon, sept pèlerins se lancent dans un dernier voyage vers Hypérion pour percer les secrets des Tombeaux du Temps. Chacun porte un lourd fardeau et un espoir désespéré.",
    },
];

export const BookBox = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    // Créer une référence pour chaque livre
    const bookRefs = useRef(booksData.map(() => createRef<HTMLDivElement>()));

    const handleSelectBook = (id: number, element: HTMLDivElement) => {
        if (document.body.style.overflow === "hidden") return;

        const rect = element.getBoundingClientRect();
        setModalPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
        });
        setSelectedId(id);
    };

    const selectedBook = booksData.find((book) => book.id === selectedId);

    const handleClose = () => {
        setSelectedId(null);
    };

    return (
        <div className="py-20">
            <Typo variant="title" components="h2" className="text-center mb-10">
                Explorez notre collection
            </Typo>
            <div className="relative h-[600px] border border-primary/20 rounded-lg p-5 flex justify-center items-center gap-10 overflow-hidden">
                <Typo
                    variant="para"
                    color="other"
                    className="absolute top-5 left-5"
                >
                    Déplacez les livres et cliquez pour en savoir plus.
                </Typo>
                {booksData.map((book, index) => (
                    <Book
                        key={book.id}
                        {...book}
                        elementRef={bookRefs.current[index]}
                        onSelect={handleSelectBook}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedBook && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            layoutId={`book-container-${selectedId}`}
                            className="relative z-10 bg-background rounded-lg overflow-hidden"
                            initial={{
                                top: modalPosition.top,
                                left: modalPosition.left,
                                width: "10rem", // 160px
                                height: "15rem", // 240px
                            }}
                            animate={{
                                top: "50%",
                                left: "50%",
                                x: "-50%",
                                y: "-50%",
                                width: "900px",
                                height: "auto",
                            }}
                        >
                            <LikeBookBoxView book={selectedBook} />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-black/70"
                            onClick={handleClose}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
