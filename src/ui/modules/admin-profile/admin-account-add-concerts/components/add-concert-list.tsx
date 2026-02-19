"use client";

import { getConcerts } from "@/api/concerts";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
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
    image: string | null;
};

export const AddConcertList = () => {
    const { authUser } = useAuth();
    const [concerts, setConcerts] = useState<ConcertListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedConcert, setSelectedConcert] =
        useState<ConcertListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
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
                    image: concert.image || null,
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
        setImagePreview(concert.image);
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
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddConcertFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedConcert) return;
        setIsUpdating(true);

        const { image, ...concertData } = formData;
        let imageUrl = selectedConcert.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `concerts/${authUser.displayName}-${imageFile.name}`,
                imageFile,
            );

            if (storageError) {
                setIsUpdating(false);
                toast.error(storageError.message);
                return;
            }
            imageUrl = url || imageUrl;
        }

        const payload = {
            ...concertData,
            image: imageUrl,
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
                            src={concert.image || undefined}
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
                                Supprimer le concert
                            </Button>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
