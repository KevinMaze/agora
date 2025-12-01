"use client";

import Image from "next/image";
import Biblio from "@/../public/assets/images/biblio.png";
import Crack from "@/../public/assets/images/déchiré.png";
import Dune from "@/../public/assets/images/dune.jpg";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import { Card } from "@/ui/design-system/card"; // Assurez-vous que ce composant existe
import { useState, useEffect } from "react";
import { Spinner } from "@/ui/design-system/spinner";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

export const CatalogueView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const BookCatalogue = [
        {
            src: Dune,
            alt: "Couverture du livre Dune",
            title: "Dune",
            description: "Un classique de la science-fiction.",
            autor: "Frank Herbert",
            category: "Science-Fiction",
            releaseYear: 1965,
        },
        {
            alt: "Couverture du livre Dune 2",
            title: "Dune 2",
            description: "Un classique de la science-fiction. Suite de Dune.",
            autor: "Frank Herbert",
            category: "Science-Fiction",
            releaseYear: 1969,
        },
        {
            alt: "Couverture du livre Dune 3",
            title: "Dune 3",
            description:
                "Un classique de la science-fiction. Partie finale de Dune.",
            autor: "Frank Herbert",
            category: "Science-Fiction",
            releaseYear: 1976,
        },
        {
            src: Dune,
            alt: "Couverture du livre Fantastique",
            title: "Le Seigneur des Anneaux",
            description: "Un grand classique de la fantaisie.",
            autor: "J.R.R. Tolkien",
            category: "Fantastique",
            releaseYear: 1954,
        },
        {
            alt: "Couverture du livre Horreur",
            title: "Ça",
            description: "Un roman d'horreur emblématique.",
            autor: "Stephen King",
            category: "Horreur",
            releaseYear: 1986,
        },
    ];

    const categories = ["Science-Fiction", "Fantastique", "Horreur", "Romance"];
    const authors = [...new Set(BookCatalogue.map((book) => book.autor))];
    const releaseYears = [
        ...new Set(BookCatalogue.map((book) => book.releaseYear)),
    ].sort((a, b) => b - a);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            let books = BookCatalogue;

            if (selectedCategories.length > 0) {
                books = books.filter((book) =>
                    selectedCategories.includes(book.category)
                );
            }

            if (selectedAuthors.length > 0) {
                books = books.filter((book) =>
                    selectedAuthors.includes(book.autor)
                );
            }

            if (selectedYears.length > 0) {
                books = books.filter((book) =>
                    selectedYears.includes(book.releaseYear)
                );
            }

            setFilteredBooks(books);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [selectedCategories, selectedAuthors, selectedYears]);

    // Ferme le dropdown si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && !(event.target as Element).closest(`#filtre`)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    const handleMultiSelect = (
        value: string | number,
        filterType: "category" | "author" | "year"
    ) => {
        const updateSelection = (
            currentSelection: (string | number)[],
            setter: React.Dispatch<React.SetStateAction<any[]>>
        ) => {
            const newSelection = [...currentSelection];
            const index = newSelection.indexOf(value);
            if (index > -1) {
                newSelection.splice(index, 1);
            } else {
                newSelection.push(value);
            }
            setter(newSelection);
        };

        switch (filterType) {
            case "category":
                updateSelection(selectedCategories, setSelectedCategories);
                break;
            case "author":
                updateSelection(selectedAuthors, setSelectedAuthors);
                break;
            case "year":
                updateSelection(selectedYears, setSelectedYears);
                break;
        }
    };

    return (
        <div className="mt-50">
            <div className="relative w-full h-150 sm:h-200 lg:h-200 overflow-hidden">
                <Image
                    src={Crack}
                    alt="Effet déchiré"
                    className="absolute -bottom-9 sm:bottom-0 lg:bottom-0 w-full h-60 object-cover z-10 rotate-180"
                />
                <div className="absolute  inset-0">
                    <Image
                        src={Biblio}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                    />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-around items-center">
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        className="text-5xl sm:text-8xl lg:text-8xl uppercase"
                    >
                        Le
                    </Typo>
                    <Typo
                        variant="para"
                        components="h1"
                        weight="bold"
                        className="text-5xl sm:text-8xl lg:text-8xl uppercase"
                    >
                        Cata
                        <Typo
                            variant="para"
                            components="span"
                            weight="bold"
                            className="-rotate-12 inline-block "
                        >
                            l
                        </Typo>
                        ogue
                    </Typo>
                </div>
            </div>

            <Container className="mt-30 mb-50">
                <div id="filtre" className="relative mb-8 z-20">
                    <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className={clsx(
                            "flex items-center justify-between w-full p-4 bg-foreground/80 backdrop-blur-sm rounded-t-lg",
                            isFilterVisible ? "rounded-b-none" : "rounded-b-lg"
                        )}
                    >
                        <Typo
                            variant="para"
                            components="p"
                            weight="bold"
                            className="text-white underline cursor-pointer"
                        >
                            Filtres
                        </Typo>
                        <FaChevronDown
                            className={clsx(
                                "transition-transform cursor-pointer",
                                isFilterVisible && "rotate-180",
                                "text-white"
                            )}
                        />
                    </button>
                    <div
                        className={clsx(
                            "absolute w-full transition-all duration-300 ease-in-out",
                            {
                                "opacity-100 transform translate-y-0":
                                    isFilterVisible,
                                "opacity-0 transform -translate-y-4 pointer-events-none":
                                    !isFilterVisible,
                            }
                        )}
                    >
                        <div className="p-4 bg-foreground/80 backdrop-blur-sm rounded-b-lg text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Dropdown Catégories */}
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === "categories"
                                                    ? null
                                                    : "categories"
                                            )
                                        }
                                        className="w-full p-2 bg-background rounded flex justify-between items-center"
                                    >
                                        Catégories{" "}
                                        {selectedCategories.length > 0 &&
                                            `(${selectedCategories.length})`}
                                        <FaChevronDown
                                            className={clsx(
                                                "transition-transform cursor-pointer",
                                                openDropdown === "categories" &&
                                                    "rotate-180"
                                            )}
                                        />
                                    </div>
                                    {openDropdown === "categories" && (
                                        <div className="absolute w-full mt-1 p-2 bg-background rounded shadow-lg max-h-48 overflow-y-auto z-2">
                                            {categories.map((cat) => (
                                                <label
                                                    key={cat}
                                                    className="flex items-center gap-2 p-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(
                                                            cat
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                cat,
                                                                "category"
                                                            )
                                                        }
                                                    />
                                                    {cat}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Dropdown Auteurs */}
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === "authors"
                                                    ? null
                                                    : "authors"
                                            )
                                        }
                                        className="w-full p-2 bg-background rounded flex justify-between items-center"
                                    >
                                        Auteurs{" "}
                                        {selectedAuthors.length > 0 &&
                                            `(${selectedAuthors.length})`}
                                        <FaChevronDown
                                            className={clsx(
                                                "transition-transform cursor-pointer",
                                                openDropdown === "authors" &&
                                                    "rotate-180"
                                            )}
                                        />
                                    </div>
                                    {openDropdown === "authors" && (
                                        <div className="absolute w-full mt-1 p-2 bg-background rounded shadow-lg max-h-48 overflow-y-auto z-2">
                                            {authors.map((author) => (
                                                <label
                                                    key={author}
                                                    className="flex items-center gap-2 p-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAuthors.includes(
                                                            author
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                author,
                                                                "author"
                                                            )
                                                        }
                                                    />
                                                    {author}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Dropdown Année */}
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === "years"
                                                    ? null
                                                    : "years"
                                            )
                                        }
                                        className="w-full p-2 bg-background rounded flex justify-between items-center"
                                    >
                                        Année de sortie{" "}
                                        {selectedYears.length > 0 &&
                                            `(${selectedYears.length})`}
                                        <FaChevronDown
                                            className={clsx(
                                                "transition-transform cursor-pointer",
                                                openDropdown === "years" &&
                                                    "rotate-180"
                                            )}
                                        />
                                    </div>
                                    {openDropdown === "years" && (
                                        <div className="absolute w-full mt-1 p-2 bg-background rounded shadow-lg max-h-48 overflow-y-auto z-2">
                                            {releaseYears.map((year) => (
                                                <label
                                                    key={year}
                                                    className="flex items-center gap-2 p-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedYears.includes(
                                                            year
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                year,
                                                                "year"
                                                            )
                                                        }
                                                    />
                                                    {year}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <div
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedAuthors([]);
                                        setSelectedYears([]);
                                    }}
                                    className="text-sm text-gray-300 hover:underline cursor-pointer"
                                >
                                    Réinitialiser les filtres
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="large" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                        {filteredBooks.map((book, index) => (
                            <Card key={index} {...book} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};
