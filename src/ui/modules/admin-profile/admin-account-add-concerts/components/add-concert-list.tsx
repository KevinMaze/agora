"use client";

import { getConcerts } from "@/api/concerts";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { storageDeleteFileByUrl, storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddConcertFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddConcertForm } from "./add-concert-form";
import Image from "next/image";

type ConcertListItem = {
    id: string;
    title: string;
    date: string;
    description: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    images: string[];
};

export const AddConcertList = () => {
    const { authUser } = useAuth();
    const [concerts, setConcerts] = useState<ConcertListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedConcert, setSelectedConcert] =
        useState<ConcertListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [editableImages, setEditableImages] = useState<string[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [selectedImageIndexes, setSelectedImageIndexes] = useState<number[]>(
        [],
    );
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm<AddConcertFormFieldsType>({
        defaultValues: {
            title: "",
            date: "",
            description: "",
            facebook: "",
            instagram: "",
            tiktok: "",
            youtube: "",
            twitter: "",
        },
    });

    const selectedImage = watch("image");
    const hasNewImage = !!selectedImage?.[0];

    const fetchConcerts = async () => {
        setIsLoading(true);
        try {
            const data = await getConcerts();
            const normalized = data
                .map((concert) => ({
                    id: concert.id || "",
                    title: concert.title || "",
                    date: concert.date || "",
                    description: concert.description || "",
                    facebook: concert.facebook || "",
                    instagram: concert.instagram || "",
                    tiktok: concert.tiktok || "",
                    youtube: concert.youtube || "",
                    twitter: concert.twitter || "",
                    images: Array.isArray(concert.images)
                        ? concert.images.filter(Boolean)
                        : concert.image
                          ? [concert.image]
                          : [],
                }))
                .filter((concert) => !!concert.id) as ConcertListItem[];
            setConcerts(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des concerts:", error);
            toast.error("Impossible de charger les concerts.");
            setConcerts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    const handleOpenEdit = (concert: ConcertListItem) => {
        setSelectedConcert(concert);
        setEditableImages(concert.images || []);
        setNewImagePreviews([]);
        setSelectedImageIndexes([]);
        reset({
            title: concert.title,
            date: concert.date,
            description: concert.description,
            facebook: concert.facebook || "",
            instagram: concert.instagram || "",
            tiktok: concert.tiktok || "",
            youtube: concert.youtube || "",
            twitter: concert.twitter || "",
        });
    };

    const closeModal = () => {
        setSelectedConcert(null);
        setEditableImages([]);
        setNewImagePreviews([]);
        setSelectedImageIndexes([]);
    };

    const toggleImageSelection = (index: number) => {
        setSelectedImageIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index],
        );
    };

    const handleRemoveSelectedImages = () => {
        if (selectedImageIndexes.length === 0) return;
        setEditableImages((prev) =>
            prev.filter((_, index) => !selectedImageIndexes.includes(index)),
        );
        setSelectedImageIndexes([]);
    };

    const onSubmitEdit: SubmitHandler<AddConcertFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedConcert) return;
        setIsUpdating(true);

        const { image, ...concertData } = formData;
        let imageUrls = [...editableImages];
        const imageFiles = Array.from(image || []);

        if (imageFiles.length > 3) {
            setIsUpdating(false);
            toast.error("Tu peux envoyer maximum 3 images");
            return;
        }

        if (imageFiles.length > 0) {
            const uploadResults = await Promise.all(
                imageFiles.map((imageFile) =>
                    storageUploadFile(
                        `concerts/${authUser.displayName}-${Date.now()}-${imageFile.name}`,
                        imageFile,
                    ),
                ),
            );

            const storageError = uploadResults.find(
                (result) => !!result.error,
            )?.error;
            if (storageError) {
                setIsUpdating(false);
                toast.error(storageError.message);
                return;
            }

            imageUrls = uploadResults
                .map((result) => result.data)
                .filter((url): url is string => !!url);

            const nextImages = [...editableImages];
            let uploadIndex = 0;
            const sortedSelection = [...selectedImageIndexes].sort(
                (a, b) => a - b,
            );

            for (const selectedIndex of sortedSelection) {
                if (uploadIndex >= imageUrls.length) break;
                if (selectedIndex >= 0 && selectedIndex < nextImages.length) {
                    nextImages[selectedIndex] = imageUrls[uploadIndex];
                    uploadIndex += 1;
                }
            }

            while (uploadIndex < imageUrls.length && nextImages.length < 3) {
                nextImages.push(imageUrls[uploadIndex]);
                uploadIndex += 1;
            }

            if (uploadIndex < imageUrls.length) {
                setIsUpdating(false);
                toast.error(
                    "Pas assez de place: supprime des images ou selectionne celles a remplacer.",
                );
                return;
            }

            imageUrls = nextImages;
        }

        if (imageUrls.length === 0) {
            setIsUpdating(false);
            toast.error("Tu dois garder au moins une image.");
            return;
        }

        const payload = {
            ...concertData,
            images: imageUrls,
            image: imageUrls[0] || null,
        };

        const { error } = await firestoreUptadeDocument(
            "concerts",
            selectedConcert.id,
            payload,
        );
        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setConcerts((prev) =>
            prev.map((concert) =>
                concert.id === selectedConcert.id
                    ? {
                          ...concert,
                          ...(payload as Omit<ConcertListItem, "id">),
                      }
                    : concert,
            ),
        );
        setEditableImages(imageUrls);
        toast.success("Concert modifie avec succes.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedConcert) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer ce concert ? Cette action est irreversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        const imageUrlsToDelete = Array.from(new Set(selectedConcert.images || []));

        if (imageUrlsToDelete.length > 0) {
            const deleteResults = await Promise.all(
                imageUrlsToDelete.map((url) => storageDeleteFileByUrl(url)),
            );

            const blockingStorageError = deleteResults.find((result) => {
                if (!result.error) return false;
                return result.error.code !== "storage/object-not-found";
            })?.error;

            if (blockingStorageError) {
                setIsDeleting(false);
                toast.error(
                    `Impossible de supprimer les images du concert: ${blockingStorageError.message}`,
                );
                return;
            }
        }

        const { error } = await firestoreDeleteDocument(
            "concerts",
            selectedConcert.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setConcerts((prev) =>
            prev.filter((concert) => concert.id !== selectedConcert.id),
        );
        toast.success("Concert supprime.");
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

    const filteredConcerts = useMemo(() => {
        if (!normalizedSearchQuery) return concerts;
        return concerts.filter((concert) =>
            (concert.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [concerts, normalizedSearchQuery]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Concerts ajoutes
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher un concert par titre"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredConcerts.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun concert trouve pour cette recherche.
                </Typo>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {filteredConcerts.map((concert) => (
                        <Card
                            key={concert.id}
                            src={concert.images[0] || undefined}
                            title={concert.title}
                            autor={concert.date}
                            onAction={() => handleOpenEdit(concert)}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={!!selectedConcert}
                onClose={closeModal}
                title={selectedConcert?.title || "Modifier le concert"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedConcert && (
                    <AddConcertForm
                        form={{
                            errors,
                            register,
                            handleSubmit,
                            onSubmit: onSubmitEdit,
                            isLoading: isUpdating,
                        }}
                        imagePreviews={newImagePreviews}
                        setImagePreviews={setNewImagePreviews}
                        submitLabel="Valider les modifications"
                        isSubmitDisabled={isSubmitDisabled}
                        footer={
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <Typo variant="para" component="p">
                                        Images actuelles (
                                        {editableImages.length}/3)
                                    </Typo>
                                    {editableImages.length === 0 ? (
                                        <Typo
                                            variant="para"
                                            component="p"
                                            className="text-sm"
                                        >
                                            Aucune image actuellement.
                                        </Typo>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-2">
                                            {editableImages.map(
                                                (url, index) => (
                                                    <button
                                                        key={`${url}-${index}`}
                                                        type="button"
                                                        onClick={() =>
                                                            toggleImageSelection(
                                                                index,
                                                            )
                                                        }
                                                        className={`relative rounded-md border-2 overflow-hidden ${selectedImageIndexes.includes(index) ? "border-primary" : "border-transparent"}`}
                                                    >
                                                        <Image
                                                            src={url}
                                                            width="140"
                                                            height="140"
                                                            alt={`Concert image ${index + 1}`}
                                                            className="w-full h-20 object-cover"
                                                        />
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    )}
                                    <Button
                                        type="button"
                                        variant={
                                            selectedImageIndexes.length > 0
                                                ? "danger"
                                                : "disabled"
                                        }
                                        disabled={
                                            selectedImageIndexes.length === 0
                                        }
                                        action={handleRemoveSelectedImages}
                                    >
                                        Supprimer la selection
                                    </Button>
                                </div>

                                <Button
                                    type="button"
                                    variant="danger"
                                    action={handleDelete}
                                    isLoading={isDeleting}
                                >
                                    Supprimer le concert
                                </Button>
                            </div>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
