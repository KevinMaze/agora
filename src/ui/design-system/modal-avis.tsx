"use client";

import DefaultAvatar from "@/../public/assets/images/user-icon-2098873_1920.png";
import MissingBookImage from "@/../public/assets/images/404.png";
import { getBook } from "@/api/books";
import { firestoreAddDocument } from "@/api/firestore";
import { useAuth } from "@/context/AuthUserContext";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Input } from "./form/input";
import { Textarea } from "./form/textarea";
import { Modal } from "./modal";
import { Typo } from "./typography";

type ModalAvisFormFields = {
    firstName: string;
    lastName: string;
    pseudo: string;
    avatar: string;
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
    const [resolvedBookTitle, setResolvedBookTitle] = useState(bookTitle || "");
    const [resolvedBookImage, setResolvedBookImage] = useState<
        string | StaticImageData | null
    >(bookImage || null);
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
    } = useForm<ModalAvisFormFields>({
        defaultValues: {
            firstName: "",
            lastName: "",
            pseudo: "",
            avatar: "",
            review: "",
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        reset({
            ...identityDefaults,
            review: "",
        });
    }, [isOpen, identityDefaults, reset]);

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

        const payload = {
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
            review: formData.review.trim(),
            moderationStatus: "pending",
            creation_date: new Date(),
            updated_date: new Date(),
        };

        const { error } = await firestoreAddDocument(
            REVIEWS_COLLECTION,
            payload,
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
                    ? `Avis - ${resolvedBookTitle}`
                    : "Donner un avis"
            }
            maxWidthClassName="max-w-3xl"
            contentClassName="!h-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <Typo variant="para" component="p" color="secondary">
                        {isConnected
                            ? "Tes informations sont pré-remplies. Tu peux les modifier avant d'envoyer ton avis."
                            : "Tu peux donner ton avis même sans compte. Nom, prénom et pseudo sont facultatifs."}
                    </Typo>

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
                            <Typo
                                variant="para"
                                component="p"
                                color="secondary"
                            >
                                Avatar par défaut appliqué si le champ reste
                                vide.
                            </Typo>
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
                    />
                    <Input
                        id="avatar"
                        label="Avatar (URL)"
                        type="text"
                        placeholder="https://... (facultatif)"
                        register={register}
                        errors={errors}
                        isLoading={isSubmitting}
                        required={false}
                    />
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
                        <Button type="submit" isLoading={isSubmitting}>
                            Envoyer mon avis
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
