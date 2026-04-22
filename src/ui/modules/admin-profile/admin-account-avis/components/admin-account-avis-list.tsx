"use client";

import { getBookReviews } from "@/api/reviews";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { useToggle } from "@/hooks/use-toggle";
import { ReviewDocument } from "@/types/review";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    AdminAccountAvisForm,
    ReviewEditFormFields,
} from "./admin-account-avis-form";

type ReviewListItem = ReviewDocument & {
    id: string;
};

const REVIEWS_PER_PAGE = 15;

const normalizeText = (value?: string | null) =>
    (value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const formatDate = (dateValue?: ReviewDocument["creation_date"]) => {
    if (!dateValue) return "Date inconnue";

    if (
        typeof dateValue === "object" &&
        dateValue !== null &&
        typeof dateValue.toDate === "function"
    ) {
        return dateValue.toDate().toLocaleString("fr-FR");
    }

    const date = new Date(dateValue as string | Date);
    if (Number.isNaN(date.getTime())) return "Date inconnue";
    return date.toLocaleString("fr-FR");
};

const getReviewLabel = (review: ReviewListItem) => {
    const authorName =
        [review.firstName, review.lastName].filter(Boolean).join(" ").trim() ||
        review.pseudo ||
        "Auteur anonyme";
    return `${authorName} - ${review.bookTitle || "Livre inconnu"}`;
};

export const AdminAccountAvisList = () => {
    const [reviews, setReviews] = useState<ReviewListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReview, setSelectedReview] = useState<ReviewListItem | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<ReviewEditFormFields>({
        defaultValues: {
            firstName: "",
            lastName: "",
            pseudo: "",
            avatar: "",
            moderationStatus: "pending",
            review: "",
        },
    });

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const data = await getBookReviews();
            const normalized = data
                .map((review) => ({
                    ...review,
                    id: review.id || "",
                    bookId: review.bookId || "",
                    bookTitle: review.bookTitle || "",
                    bookImage: review.bookImage || null,
                    userId: review.userId || null,
                    firstName: review.firstName || null,
                    lastName: review.lastName || null,
                    pseudo: review.pseudo || null,
                    avatar:
                        review.avatar ||
                        "/assets/images/user-icon-2098873_1920.png",
                    review: review.review || "",
                    moderationStatus: review.moderationStatus || "pending",
                    creation_date: review.creation_date || null,
                    updated_date: review.updated_date || null,
                }))
                .filter((review) => Boolean(review.id)) as ReviewListItem[];
            setReviews(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des avis:", error);
            toast.error("Impossible de charger les avis.");
            setReviews([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleOpenEdit = (review: ReviewListItem) => {
        setSelectedReview(review);
        reset({
            firstName: review.firstName || "",
            lastName: review.lastName || "",
            pseudo: review.pseudo || "",
            avatar: review.avatar || "",
            moderationStatus: review.moderationStatus || "pending",
            review: review.review || "",
        });
    };

    const closeModal = () => {
        setSelectedReview(null);
    };

    const onSubmitEdit: SubmitHandler<ReviewEditFormFields> = async (
        formData,
    ) => {
        if (!selectedReview) return;
        setIsUpdating(true);

        const payload = {
            firstName: formData.firstName.trim() || null,
            lastName: formData.lastName.trim() || null,
            pseudo: formData.pseudo.trim() || null,
            avatar:
                formData.avatar.trim() ||
                "/assets/images/user-icon-2098873_1920.png",
            moderationStatus: formData.moderationStatus,
            review: formData.review.trim(),
            updated_date: new Date(),
        };

        const { error } = await firestoreUptadeDocument(
            "book-reviews",
            selectedReview.id,
            payload,
        );

        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setReviews((prev) =>
            prev.map((review) =>
                review.id === selectedReview.id ? { ...review, ...payload } : review,
            ),
        );
        setSelectedReview((prev) => (prev ? { ...prev, ...payload } : prev));
        setIsUpdating(false);
        toast.success("Avis modifié avec succès.");
    };

    const handleDelete = async () => {
        if (!selectedReview) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer cet avis ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        const { error } = await firestoreDeleteDocument(
            "book-reviews",
            selectedReview.id,
        );

        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setReviews((prev) => prev.filter((review) => review.id !== selectedReview.id));
        setIsDeleting(false);
        toast.success("Avis supprimé.");
        closeModal();
    };

    const normalizedSearchQuery = useMemo(
        () => normalizeText(searchQuery).trim(),
        [searchQuery],
    );

    const filteredReviews = useMemo(() => {
        if (!normalizedSearchQuery) return reviews;
        return reviews.filter((review) => {
            const searchableText = [
                review.bookTitle,
                review.pseudo,
                review.firstName,
                review.lastName,
                review.review,
                review.moderationStatus,
            ]
                .map((value) => normalizeText(value))
                .join(" ");
            return searchableText.includes(normalizedSearchQuery);
        });
    }, [reviews, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedReviews = useMemo(() => {
        const start = (currentPage - 1) * REVIEWS_PER_PAGE;
        const end = start + REVIEWS_PER_PAGE;
        return filteredReviews.slice(start, end);
    }, [filteredReviews, currentPage]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Avis envoyés
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher par livre, auteur ou texte"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredReviews.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun avis trouvé.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedReviews.map((review) => (
                            <Card
                                key={review.id}
                                src={
                                    review.bookImage ||
                                    "/assets/images/404.png"
                                }
                                title={review.bookTitle || "Livre inconnu"}
                                autor={review.pseudo || "Auteur anonyme"}
                                description={review.review}
                                onAction={() => handleOpenEdit(review)}
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
                isOpen={Boolean(selectedReview)}
                onClose={closeModal}
                title={selectedReview ? getReviewLabel(selectedReview) : "Avis"}
                maxWidthClassName="max-w-2xl"
                contentClassName="!h-auto"
            >
                {selectedReview && (
                    <div className="space-y-4">
                        <Typo variant="para" component="p" color="secondary">
                            Publié le {formatDate(selectedReview.creation_date)}
                        </Typo>

                        <AdminAccountAvisForm
                            register={register}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            isLoading={isUpdating}
                            onSubmit={onSubmitEdit}
                            isSubmitDisabled={!isDirty}
                            bookId={selectedReview.bookId}
                            bookTitle={selectedReview.bookTitle}
                            footer={
                                <Button
                                    type="button"
                                    variant="danger"
                                    action={handleDelete}
                                    isLoading={isDeleting}
                                >
                                    Supprimer l'avis
                                </Button>
                            }
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};
