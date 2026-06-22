"use client";

import DefaultAvatar from "@/../public/assets/images/user-icon-2098873_1920.png";
import MissingBookImage from "@/../public/assets/images/404.png";
import { getBook } from "@/api/books";
import { firestoreAddDocument, firestoreUpdateDocument } from "@/api/firestore";
import { getUserBookReview } from "@/api/reviews";
import { useAuth } from "@/context/AuthUserContext";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Input } from "./form/input";
import { StarRating } from "./star-rating";
import { Textarea } from "./form/textarea";
import { Modal } from "./modal";
import { Typo } from "./typography";

type ModalAvisFormFields = {
    firstName: string;
    lastName: string;
    pseudo: string;
    avatar: string;
    rating: number;
    review: string;
};

interface ModalAvisProps {
    isOpen: boolean;
    onClose: () => void;
    bookId?: string;
    bookTitle?: string;
    bookImage?: string | StaticImageData | null;
    onOpenBookModal?: () => void;
}

const REVIEWS_COLLECTION = "bookReviews";

const getImageUrl = (image?: string | StaticImageData | null) => {
    if (!image) return null;
    if (typeof image === "string") return image;
    return image.src;
};

const getDisplayBookImage = (
    image?: string | StaticImageData | null,
): string | StaticImageData => {
    return image || MissingBookImage;
};

const splitName = (name?: string) => {
    if (!name) {
        return {
            firstName: "",
            lastName: "",
        };
    }

    const values = name.trim().split(/\s+/).filter(Boolean);
    return {
        firstName: values[0] || "",
        lastName: values.slice(1).join(" "),
    };
};

export const ModalAvis = ({
    isOpen,
    onClose,
    bookId,
    bookTitle,
    bookImage,
    onOpenBookModal,
}: ModalAvisProps) => {
    const { authUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingExistingReview, setIsLoadingExistingReview] = useState(false);
    const [resolvedBookTitle, setResolvedBookTitle] = useState(bookTitle || "");
    const [resolvedBookImage, setResolvedBookImage] = useState<
        string | StaticImageData | null
    >(bookImage || null);
    const [currentRating, setCurrentRating] = useState(0);
    const [existingReviewId, setExistingReviewId] = useState<string | null>(null);
    const isConnected = Boolean(authUser?.uid);

    const identityDefaults = useMemo(() => {
        const userFullName =
            authUser?.userDocument?.name || authUser?.displayName || "";
        const separatedName = splitName(userFullName);

        return {
            firstName: separatedName.firstName,
            lastName: separatedName.lastName,
            pseudo:
                authUser?.userDocument?.displayName ||
                authUser?.displayName ||
                "",
            avatar:
                authUser?.userDocument?.photoURL || authUser?.photoURL || "",
        };
    }, [
        authUser?.displayName,
        authUser?.photoURL,
        authUser?.userDocument?.displayName,
        authUser?.userDocument?.name,
        authUser?.userDocument?.photoURL,
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<ModalAvisFormFields>({
        defaultValues: {
            firstName: "",
            lastName: "",
            pseudo: "",
            avatar: "",
            rating: 0,
            review: "",
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        setCurrentRating(0);
        setExistingReviewId(null);
        reset({
            ...identityDefaults,
            rating: 0,
            review: "",
        });
    }, [isOpen, identityDefaults, reset]);

    // Récupérer l'avis existant si l'utilisateur est connecté
    useEffect(() => {
        const fetchExistingReview = async () => {
            if (!isOpen || !authUser?.uid || !bookId) return;

            setIsLoadingExistingReview(true);
            try {
                const existingReview = await getUserBookReview(authUser.uid, bookId);
                if (existingReview) {
                    setExistingReviewId(existingReview.id || null);
                    setCurrentRating(existingReview.rating || 0);
                    reset({
                        firstName: existingReview.firstName || "",
                        lastName: existingReview.lastName || "",
                        pseudo: existingReview.pseudo || "",
                        avatar: existingReview.avatar || "",
                        rating: existingReview.rating || 0,
                        review: existingReview.review || "",
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'avis existant:", error);
            } finally {
                setIsLoadingExistingReview(false);
            }
        };

        fetchExistingReview();
    }, [isOpen, authUser?.uid, bookId, reset]);

    useEffect(() => {
        let isActive = true;

        const syncBookData = async () => {
            if (!isOpen) return;

            setResolvedBookTitle(bookTitle || "");
            setResolvedBookImage(bookImage || null);

            if (!bookId) return;

            try {
                const book = await getBook(bookId);
                if (!isActive || !book) return;

                setResolvedBookTitle(book.title || bookTitle || "");
                setResolvedBookImage(book.image || bookImage || null);
            } catch (error) {
                if (!isActive) return;
                console.error(
                    "Erreur lors de la récupération du livre:",
                    error,
                );
            }
        };

        syncBookData();

        return () => {
            isActive = false;
        };
    }, [isOpen, bookId, bookTitle, bookImage]);

    const avatarPreview = watch("avatar");

    const onSubmit: SubmitHandler<ModalAvisFormFields> = async (formData) => {
        if (!bookId) {
            toast.error("Impossible de publier l'avis: livre introuvable.");
            return;
        }

        setIsSubmitting(true);

        // Si un avis existe déjà, on le met à jour
        if (existingReviewId) {
            const updatePayload = {
                firstName: formData.firstName.trim() || null,
                lastName: formData.lastName.trim() || null,
                pseudo: formData.pseudo.trim() || null,
                avatar:
                    formData.avatar.trim() ||
                    "/assets/images/user-icon-2098873_1920.png",
                rating: formData.rating,
                review: formData.review.trim(),
                updated_date: new Date(),
            };

            const { error } = await firestoreUpdateDocument(
                REVIEWS_COLLECTION,
                existingReviewId,
                updatePayload,
            );

            if (error) {
                setIsSubmitting(false);
                toast.error(error.message);
                return;
            }

            toast.success("Ton avis a bien été modifié.");
            setIsSubmitting(false);
            onClose();
            return;
        }

        // Sinon, on crée un nouvel avis
        const createPayload = {
            bookId,
            bookTitle: resolvedBookTitle || bookTitle || "",
            bookImage: getImageUrl(resolvedBookImage || bookImage || null),
            userId: authUser?.uid || null,
            firstName: formData.firstName.trim() || null,
            lastName: formData.lastName.trim() || null,
            pseudo: formData.pseudo.trim() || null,
            avatar:
                formData.avatar.trim() ||
                "/assets/images/user-icon-2098873_1920.png",
            rating: formData.rating,
            review: formData.review.trim(),
            moderationStatus: "pending",
            creation_date: new Date(),
            updated_date: new Date(),
        };

        const { error } = await firestoreAddDocument(
            REVIEWS_COLLECTION,
            createPayload,
        );

        if (error) {
            setIsSubmitting(false);
            toast.error(error.message);
            return;
        }

        toast.success("Ton avis a bien été envoyé.");
        setIsSubmitting(false);
        onClose();
    };

    const handleOpenBookModal = () => {
        onClose();
        onOpenBookModal?.();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                resolvedBookTitle
                    ? `${existingReviewId ? "Modifier" : "Donner"} un avis - ${resolvedBookTitle}`
                    : existingReviewId
                      ? "Modifier votre avis"
                      : "Donner un avis"
            }
            maxWidthClassName="max-w-3xl"
            contentClassName="!h-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-primary/40 bg-foreground/40 p-4 space-y-3">
                        <Typo variant="para" component="p" weight="bold">
                            Livre concerné
                        </Typo>
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-20 rounded-md overflow-hidden border border-primary/30">
                                <Image
                                    src={getDisplayBookImage(
                                        resolvedBookImage || bookImage,
                                    )}
                                    alt={
                                        resolvedBookTitle ||
                                        bookTitle ||
                                        "Livre"
                                    }
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-2">
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                    className="font-medium"
                                >
                                    {resolvedBookTitle || bookTitle || "Livre"}
                                </Typo>
                                {onOpenBookModal && (
                                    <Button
                                        type="button"
                                        size="small"
                                        action={handleOpenBookModal}
                                    >
                                        Voir la fiche du livre
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border-2 border-primary/40 bg-foreground/40 p-4">
                        <Typo variant="para" component="p" weight="bold">
                            Avatar utilisé
                        </Typo>
                        <div className="mt-3 flex items-center gap-4">
                            <Avatar
                                size="large"
                                src={avatarPreview || DefaultAvatar}
                                alt="Avatar de l'auteur de l'avis"
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        id="firstName"
                        label="Prénom"
                        type="text"
                        placeholder="Prénom (facultatif)"
                        register={register}
                        errors={errors}
                        isLoading={isSubmitting}
                        required={false}
                        readOnly={isConnected}
                    />
                    <Input
                        id="lastName"
                        label="Nom"
                        type="text"
                        placeholder="Nom (facultatif)"
                        register={register}
                        errors={errors}
                        isLoading={isSubmitting}
                        required={false}
                        readOnly={isConnected}
                    />
                    <Input
                        id="pseudo"
                        label="Pseudo"
                        type="text"
                        placeholder="Pseudo (facultatif)"
                        register={register}
                        errors={errors}
                        isLoading={isSubmitting}
                        required={false}
                        readOnly={isConnected}
                    />

                    <div className="space-y-2">
                        <Typo variant="para" component="p" weight="bold" color="primary">
                            Note du livre
                        </Typo>
                        <StarRating
                            rating={currentRating}
                            interactive={true}
                            onRatingChange={(rating) => {
                                setCurrentRating(rating);
                                setValue("rating", rating);
                            }}
                            size="large"
                            showRatingValue={true}
                        />
                    </div>

                    <Textarea
                        id="review"
                        label="Ton avis"
                        placeholder="Partage ton avis sur ce livre..."
                        register={register}
                        errors={errors}
                        isLoading={isSubmitting}
                        errorMsg="Tu dois écrire un avis avant d'envoyer."
                        rows={7}
                    />

                    <div className="pt-2">
                        <Button type="submit" isLoading={isSubmitting || isLoadingExistingReview}>
                            {existingReviewId ? "Modifier mon avis" : "Envoyer mon avis"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
