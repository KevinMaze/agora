"use client";

import { getBoxes } from "@/api/boxes";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { storageDeleteFileByUrl, storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddBoxFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddBoxForm } from "./add-box-form";

type BoxListItem = {
    id: string;
    title: string;
    description: string;
    type: string;
    price: string;
    image: string | null;
};

export const AddBoxList = () => {
    const BOXES_PER_PAGE = 15;
    const { authUser } = useAuth();
    const [boxes, setBoxes] = useState<BoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBox, setSelectedBox] = useState<BoxListItem | null>(null);
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
    } = useForm<AddBoxFormFieldsType>({
        defaultValues: {
            title: "",
            description: "",
            type: "standard",
            price: "",
        },
    });

    const selectedImage = watch("image");
    const hasNewImage = !!selectedImage?.[0];

    const fetchBoxes = async () => {
        setIsLoading(true);
        try {
            const data = await getBoxes();
            const normalized = data
                .map((box) => ({
                    id: box.id || "",
                    title: box.title || "",
                    description: box.description || "",
                    type: box.type || "",
                    price: box.price || "",
                    image: box.image || null,
                }))
                .filter((box) => !!box.id) as BoxListItem[];
            setBoxes(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des box:", error);
            toast.error("Impossible de charger les box.");
            setBoxes([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBoxes();
    }, []);

    const handleOpenEdit = (box: BoxListItem) => {
        setSelectedBox(box);
        setImagePreview(box.image);
        reset({
            title: box.title,
            description: box.description,
            type: box.type,
            price: box.price,
        });
    };

    const closeModal = () => {
        setSelectedBox(null);
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddBoxFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedBox) return;
        setIsUpdating(true);

        const { image, ...boxData } = formData;
        let imageUrl = selectedBox.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `boxes/${authUser.displayName}-${imageFile.name}`,
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
            ...boxData,
            image: imageUrl,
        };

        const { error } = await firestoreUptadeDocument(
            "boxes",
            selectedBox.id,
            payload,
        );
        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setBoxes((prev) =>
            prev.map((box) =>
                box.id === selectedBox.id
                    ? { ...box, ...(payload as Omit<BoxListItem, "id">) }
                    : box,
            ),
        );

        toast.success("Box modifiée avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedBox) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer cette box ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        if (selectedBox.image) {
            const { error: storageDeleteError } = await storageDeleteFileByUrl(
                selectedBox.image,
            );
            if (
                storageDeleteError &&
                storageDeleteError.code !== "storage/object-not-found"
            ) {
                setIsDeleting(false);
                toast.error(
                    `Impossible de supprimer l'image de la box: ${storageDeleteError.message}`,
                );
                return;
            }
        }

        const { error } = await firestoreDeleteDocument("boxes", selectedBox.id);
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setBoxes((prev) => prev.filter((box) => box.id !== selectedBox.id));
        toast.success("Box supprimée.");
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

    const filteredBoxes = useMemo(() => {
        if (!normalizedSearchQuery) return boxes;
        return boxes.filter((box) =>
            (box.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [boxes, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBoxes.length / BOXES_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedBoxes = useMemo(() => {
        const start = (currentPage - 1) * BOXES_PER_PAGE;
        const end = start + BOXES_PER_PAGE;
        return filteredBoxes.slice(start, end);
    }, [filteredBoxes, currentPage]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Box ajoutées
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher une box par titre"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredBoxes.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucune box trouvée pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedBoxes.map((box) => (
                            <Card
                                key={box.id}
                                src={box.image || undefined}
                                title={box.title}
                                autor={box.type}
                                onAction={() => handleOpenEdit(box)}
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
                isOpen={!!selectedBox}
                onClose={closeModal}
                title={selectedBox?.title || "Modifier la box"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedBox && (
                    <AddBoxForm
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
                                Supprimer la box
                            </Button>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
