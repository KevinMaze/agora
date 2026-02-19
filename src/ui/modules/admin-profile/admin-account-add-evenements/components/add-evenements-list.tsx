"use client";

import { getEvenements } from "@/api/evenements";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { storageDeleteFileByUrl, storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddEvenementFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddEvenementsForm } from "./add-evenements-form";

type EventListItem = {
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

export const AddEvenementsList = () => {
    const EVENTS_PER_PAGE = 15;
    const { authUser } = useAuth();
    const [events, setEvents] = useState<EventListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<EventListItem | null>(
        null,
    );
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
    } = useForm<AddEvenementFormFieldsType>({
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

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const data = await getEvenements();
            const normalized = data
                .map((event) => ({
                    id: event.id || "",
                    title: event.title || "",
                    date: event.date || "",
                    description: event.description || "",
                    facebook: event.facebook || "",
                    instagram: event.instagram || "",
                    tiktok: event.tiktok || "",
                    youtube: event.youtube || "",
                    twitter: event.twitter || "",
                    image: event.image || null,
                }))
                .filter((event) => !!event.id) as EventListItem[];
            setEvents(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des événements:", error);
            toast.error("Impossible de charger les événements.");
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleOpenEdit = (event: EventListItem) => {
        setSelectedEvent(event);
        setImagePreview(event.image);
        reset({
            title: event.title,
            date: event.date,
            description: event.description,
            facebook: event.facebook || "",
            instagram: event.instagram || "",
            tiktok: event.tiktok || "",
            youtube: event.youtube || "",
            twitter: event.twitter || "",
        });
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddEvenementFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedEvent) return;
        setIsUpdating(true);

        const { image, ...eventData } = formData;
        let imageUrl = selectedEvent.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `evenements/${authUser.displayName}-${imageFile.name}`,
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
            ...eventData,
            image: imageUrl,
        };

        const { error } = await firestoreUptadeDocument(
            "evenements",
            selectedEvent.id,
            payload,
        );
        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setEvents((prev) =>
            prev.map((event) =>
                event.id === selectedEvent.id
                    ? { ...event, ...(payload as Omit<EventListItem, "id">) }
                    : event,
            ),
        );
        toast.success("Événement modifié avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedEvent) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer cet événement ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        if (selectedEvent.image) {
            const { error: storageDeleteError } = await storageDeleteFileByUrl(
                selectedEvent.image,
            );
            if (
                storageDeleteError &&
                storageDeleteError.code !== "storage/object-not-found"
            ) {
                setIsDeleting(false);
                toast.error(
                    `Impossible de supprimer l'image de l'evenement: ${storageDeleteError.message}`,
                );
                return;
            }
        }

        const { error } = await firestoreDeleteDocument(
            "evenements",
            selectedEvent.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
        toast.success("Événement supprimé.");
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

    const filteredEvents = useMemo(() => {
        if (!normalizedSearchQuery) return events;
        return events.filter((event) =>
            (event.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [events, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredEvents.length / EVENTS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * EVENTS_PER_PAGE;
        const end = start + EVENTS_PER_PAGE;
        return filteredEvents.slice(start, end);
    }, [filteredEvents, currentPage]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Événements ajoutés
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher un événement par titre"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredEvents.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun événement trouvé pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedEvents.map((event) => (
                            <Card
                                key={event.id}
                                src={event.image || undefined}
                                title={event.title}
                                autor={event.date}
                                onAction={() => handleOpenEdit(event)}
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
                isOpen={!!selectedEvent}
                onClose={closeModal}
                title={selectedEvent?.title || "Modifier l'événement"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedEvent && (
                    <AddEvenementsForm
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
                                Supprimer l'événement
                            </Button>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
