"use client";

import { getBookReviews } from "@/api/reviews";
import {
    firestoreDeleteDocument,
    firestoreUpdateDocument,
} from "@/api/firestore";
import { useToggle } from "@/hooks/use-toggle";
import { ReviewDocument } from "@/types/review";
import { Button } from "@/ui/design-system/button";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { StarRating } from "@/ui/design-system/star-rating";
import { Typo } from "@/ui/design-system/typography";
import { Timestamp } from "firebase/firestore";
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
        "toDate" in dateValue &&
        typeof (dateValue as Timestamp).toDate === "function"
    ) {
        return (dateValue as Timestamp).toDate().toLocaleString("fr-FR");
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
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRating, setCurrentRating] = useState(0);
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
            rating: 0,
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
                    rating: review.rating || 0,
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
        const rating = review.rating || 0;
        setCurrentRating(rating);
        reset({
            firstName: review.firstName || "",
            lastName: review.lastName || "",
            pseudo: review.pseudo || "",
            avatar: review.avatar || "",
            moderationStatus: review.moderationStatus || "pending",
            rating: rating,
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
            rating: formData.rating,
            review: formData.review.trim(),
            updated_date: new Date(),
        };

        const { error } = await firestoreUpdateDocument(
            "bookReviews",
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
                review.id === selectedReview.id
                    ? { ...review, ...payload }
                    : review,
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
            "bookReviews",
            selectedReview.id,
        );

        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setReviews((prev) =>
            prev.filter((review) => review.id !== selectedReview.id),
        );
        setIsDeleting(false);
        toast.success("Avis supprimé.");
        closeModal();
    };

    const normalizedSearchQuery = useMemo(
        () => normalizeText(searchQuery).trim(),
        [searchQuery],
    );

    const filteredReviews = useMemo(() => {
        return reviews.filter((review) => {
            if (statusFilter !== "all" && review.moderationStatus !== statusFilter) return false;
            if (!normalizedSearchQuery) return true;
            const searchableText = [
                review.bookTitle,
                review.pseudo,
                review.firstName,
                review.lastName,
                review.review,
            ]
                .map((value) => normalizeText(value))
                .join(" ");
            return searchableText.includes(normalizedSearchQuery);
        });
    }, [reviews, normalizedSearchQuery, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery, statusFilter]);

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

            <div className="w-full max-w-xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher par livre, auteur ou texte"
                    className="flex-1 px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other bg-background"
                >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="approved">Validé</option>
                    <option value="rejected">Refusé</option>
                </select>
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
                    <div className="w-full space-y-4">
                        {paginatedReviews.map((review) => (
                            <div
                                key={review.id}
                                className="relative rounded-lg border-2 border-primary/40 bg-foreground/40 p-6 space-y-3 hover:bg-foreground/60 transition-colors"
                            >
                                {review.moderationStatus === "approved" && (
                                    <span className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[var(--color-tier)]" title="Validé" />
                                )}
                                {review.moderationStatus === "rejected" && (
                                    <span className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[var(--color-danger)]" title="Refusé" />
                                )}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Typo
                                            variant="title"
                                            component="h3"
                                            weight="bold"
                                            color="primary"
                                            className="text-lg sm:text-xl"
                                        >
                                            {review.bookTitle ||
                                                "Livre inconnu"}
                                        </Typo>
                                        <Typo
                                            variant="para"
                                            component="p"
                                            color="other"
                                            className="text-sm mt-1"
                                        >
                                            Par{" "}
                                            {review.pseudo ||
                                                review.firstName ||
                                                "Auteur anonyme"}
                                        </Typo>
                                    </div>
                                    <Button
                                        type="button"
                                        size="small"
                                        action={() => handleOpenEdit(review)}
                                    >
                                        Voir
                                    </Button>
                                </div>

                                <div className="py-2">
                                    <StarRating
                                        rating={review.rating || 0}
                                        interactive={false}
                                        size="medium"
                                    />
                                </div>

                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                    className="line-clamp-3 text-sm sm:text-base"
                                >
                                    {review.review || "Aucun avis"}
                                </Typo>
                            </div>
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
                            currentRating={currentRating}
                            onRatingChange={setCurrentRating}
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
