"use client";

import Image from "next/image";
import Biblio from "@/../public/assets/images/biblio.png";
import Crack from "@/../public/assets/images/déchiré.png";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";
import { Card } from "@/ui/design-system/card"; // Assurez-vous que ce composant existe
import { useState, useEffect } from "react";
import { Spinner } from "@/ui/design-system/spinner";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { getBooks } from "@/api/books";
import { toast } from "react-toastify";
import error from "@/../public/assets/images/404.png";

export const CatalogueView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [allBooks, setAllBooks] = useState<any[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const booksFromDb = await getBooks();
                // Adapter les données de Firestore pour le composant
                const formattedBooks = booksFromDb.map((book) => {
                    // Gestion sécurisée de la date (Timestamp Firestore ou string/date standard)
                    let releaseYear = "N/A";
                    if (book.releaseYear) {
                        if (book.releaseYear) {
                            releaseYear = book.releaseYear;
                        } else {
                            const date = new Date(book.releaseYear);
                            if (!isNaN(date.getTime())) {
                                releaseYear = date.getFullYear().toString();
                            }
                        }
                    }
                    return {
                        ...book,
                        autor: book.autor,
                        category: book.category,
                        releaseYear: releaseYear,
                        src: book.image || error, // Image de secours
                    };
                });
                setAllBooks(formattedBooks);
            } catch (error) {
                console.error("Failed to fetch books:", error);
                toast.error("Erreur lors de la récupération des livres.");
                setAllBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const category = [...new Set(allBooks.map((book) => book.category))].filter(
        Boolean,
    );
    const autors = [...new Set(allBooks.map((book) => book.autor))].filter(
        Boolean,
    );
    const releaseYears = [
        ...new Set(allBooks.map((book) => String(book.releaseYear))),
    ].sort((a, b) => Number(b) - Number(a));

    useEffect(() => {
        let books = allBooks;

        if (selectedCategory.length > 0) {
            books = books.filter(
                (book) =>
                    book.category && selectedCategory.includes(book.category),
            );
        }

        if (selectedAuthors.length > 0) {
            books = books.filter(
                (book) => book.autor && selectedAuthors.includes(book.autor),
            );
        }

        if (selectedYears.length > 0) {
            books = books.filter(
                (book) =>
                    book.releaseYear &&
                    selectedYears.includes(String(book.releaseYear)),
            );
        }

        setFilteredBooks(books);
    }, [selectedCategory, selectedAuthors, selectedYears, allBooks]);

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
        value: string,
        filterType: "category" | "autor" | "releaseYear",
    ) => {
        const updateSelection = (
            currentSelection: string[],
            setter: React.Dispatch<React.SetStateAction<string[]>>,
        ) => {
            const newSelection = [...currentSelection];
            const index = newSelection.indexOf(String(value));
            if (index > -1) {
                newSelection.splice(index, 1);
            } else {
                newSelection.push(String(value));
            }
            setter(newSelection);
        };

        switch (filterType) {
            case "category":
                updateSelection(selectedCategory, setSelectedCategory as any);
                break;
            case "autor":
                updateSelection(selectedAuthors, setSelectedAuthors as any);
                break;
            case "releaseYear":
                updateSelection(selectedYears, setSelectedYears as any);
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
                            isFilterVisible ? "rounded-b-none" : "rounded-b-lg",
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
                                "text-white",
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
                            },
                        )}
                    >
                        <div className="p-4 bg-foreground/80 backdrop-blur-sm rounded-b-lg text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Dropdown Catégories */}
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === "category"
                                                    ? null
                                                    : "category",
                                            )
                                        }
                                        className="w-full p-2 bg-background rounded flex justify-between items-center"
                                    >
                                        Catégories{" "}
                                        {selectedCategory.length > 0 &&
                                            `(${selectedCategory.length})`}
                                        <FaChevronDown
                                            className={clsx(
                                                "transition-transform cursor-pointer",
                                                openDropdown === "category" &&
                                                    "rotate-180",
                                            )}
                                        />
                                    </div>
                                    {openDropdown === "category" && (
                                        <div className="absolute w-full mt-1 p-2 bg-background rounded shadow-lg max-h-48 overflow-y-auto z-2">
                                            {category.map((cat) => (
                                                <label
                                                    key={cat}
                                                    className="flex items-center gap-2 p-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategory.includes(
                                                            String(cat),
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                String(cat),
                                                                "category",
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
                                                    : "authors",
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
                                                    "rotate-180",
                                            )}
                                        />
                                    </div>
                                    {openDropdown === "authors" && (
                                        <div className="absolute w-full mt-1 p-2 bg-background rounded shadow-lg max-h-48 overflow-y-auto z-2">
                                            {autors.map((autor) => (
                                                <label
                                                    key={autor}
                                                    className="flex items-center gap-2 p-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAuthors.includes(
                                                            String(autor),
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                String(autor),
                                                                "autor",
                                                            )
                                                        }
                                                    />
                                                    {autor}
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
                                                    : "years",
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
                                                    "rotate-180",
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
                                                            String(year),
                                                        )}
                                                        onChange={() =>
                                                            handleMultiSelect(
                                                                String(year),
                                                                "releaseYear",
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
                                        setSelectedCategory([]);
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
