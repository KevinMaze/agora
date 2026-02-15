"use client";

import { getBooks } from "@/api/books";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddBookFormFieldsType } from "@/types/form";
import { Modal } from "@/ui/design-system/modal";
import { Card } from "@/ui/design-system/card";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { AddBookForm } from "./add-book-form";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/ui/design-system/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type BookListItem = {
    id: string;
    title: string;
    autor: string;
    description: string;
    category: string | string[];
    releaseYear: string;
    image: string | null;
};

const normalizeCategoryForForm = (category?: string | string[]) => {
    if (Array.isArray(category)) {
        return category.filter(Boolean);
    }
    if (typeof category === "string" && category) {
        return [category];
    }
    return [];
};

export const AddBookList = () => {
    const BOOKS_PER_PAGE = 15;
    const { authUser } = useAuth();
    const [books, setBooks] = useState<BookListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<BookListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm<AddBookFormFieldsType>({
        defaultValues: {
            title: "",
            autor: "",
            description: "",
            category: "",
            releaseYear: "",
        },
    });

    const selectedImage = watch("image");
    const hasNewImage = !!selectedImage?.[0];

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const data = await getBooks();
            const normalized = data
                .map((book) => ({
                    id: book.id,
                    title: book.title || "",
                    autor: book.autor || "",
                    description: book.description || "",
                    category: book.category || "",
                    releaseYear: book.releaseYear || "",
                    image: book.image || null,
                }))
                .filter((book) => !!book.id) as BookListItem[];
            setBooks(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des livres:", error);
            toast.error("Impossible de charger les livres.");
            setBooks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleOpenEdit = (book: BookListItem) => {
        setSelectedBook(book);
        setImagePreview(book.image);
        reset({
            title: book.title,
            autor: book.autor,
            description: book.description,
            category: normalizeCategoryForForm(book.category),
            releaseYear: book.releaseYear,
        });
    };

    const closeModal = () => {
        setSelectedBook(null);
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddBookFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedBook) return;
        setIsUpdating(true);

        const { image, ...bookData } = formData;
        let imageUrl = selectedBook.image;

        const imageFile = image?.[0];
        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `books/${authUser.displayName}-${imageFile.name}`,
                imageFile,
            );

            if (storageError) {
                setIsUpdating(false);
                toast.error(storageError.message);
                return;
            }

            imageUrl = url || imageUrl;
        }

        const category = Array.isArray(bookData.category)
            ? bookData.category[0] || ""
            : bookData.category;

        const payload = {
            ...bookData,
            category,
            image: imageUrl,
        };

        const { error } = await firestoreUptadeDocument(
            "books",
            selectedBook.id,
            payload,
        );

        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setBooks((prev) =>
            prev.map((book) =>
                book.id === selectedBook.id
                    ? {
                          ...book,
                          ...(payload as Omit<BookListItem, "id">),
                      }
                    : book,
            ),
        );
        toast.success("Livre modifié avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedBook) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer ce livre ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        const { error } = await firestoreDeleteDocument(
            "books",
            selectedBook.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setBooks((prev) => prev.filter((book) => book.id !== selectedBook.id));
        toast.success("Livre supprimé.");
        setIsDeleting(false);
        closeModal();
    };

    const isSubmitDisabled = useMemo(
        () => !isDirty && !hasNewImage,
        [isDirty, hasNewImage],
    );

    const normalizedSearchQuery = useMemo(
        () =>
            searchQuery
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim(),
        [searchQuery],
    );

    const filteredBooks = useMemo(() => {
        if (!normalizedSearchQuery) return books;
        return books.filter((book) =>
            (book.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [books, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBooks.length / BOOKS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * BOOKS_PER_PAGE;
        const end = start + BOOKS_PER_PAGE;
        return filteredBooks.slice(start, end);
    }, [filteredBooks, currentPage, BOOKS_PER_PAGE]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Livres ajoutés
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher par titre ou groupe de mots"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredBooks.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun livre trouvé pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedBooks.map((book) => (
                            <Card
                                key={book.id}
                                src={book.image || undefined}
                                title={book.title}
                                autor={book.autor}
                                onAction={() => handleOpenEdit(book)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === 1 ? "disabled" : "primary"
                                }
                                disabled={currentPage === 1}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                                icon={{ icon: FaChevronLeft }}
                                iconPosition="left"
                            >
                                Précédent
                            </Button>

                            <Typo variant="para" component="p">
                                Page {currentPage} / {totalPages}
                            </Typo>

                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === totalPages
                                        ? "disabled"
                                        : "primary"
                                }
                                disabled={currentPage === totalPages}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(totalPages, prev + 1),
                                    )
                                }
                                icon={{ icon: FaChevronRight }}
                                iconPosition="right"
                            >
                                Suivant
                            </Button>
                        </div>
                    )}
                </>
            )}

            <Modal
                isOpen={!!selectedBook}
                onClose={closeModal}
                title={selectedBook?.title || "Modifier le livre"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedBook && (
                    <div className="flex flex-col gap-5">
                        <AddBookForm
                            form={{
                                errors,
                                register,
                                handleSubmit,
                                onSubmit: onSubmitEdit,
                                isLoading: isUpdating,
                            }}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                            submitLabel="Valider les modifications"
                            isSubmitDisabled={isSubmitDisabled}
                            footer={
                                <Button
                                    type="button"
                                    variant="danger"
                                    action={handleDelete}
                                    isLoading={isDeleting}
                                >
                                    Supprimer le livre
                                </Button>
                            }
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};
