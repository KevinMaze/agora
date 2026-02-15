"use client";

import { firestoreDeleteDocument, firestoreUptadeDocument } from "@/api/firestore";
import { getMoments } from "@/api/moments";
import { storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { AddMomentFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddMomentForm } from "./add-moment-form";

type MomentListItem = {
    id: string;
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string | string[];
    allergènes: string | string[];
    price: string;
    image: string | null;
};

const toInputString = (value?: string | string[]) => {
    if (Array.isArray(value)) return value.join(", ");
    return value || "";
};

const toCheckboxArray = (value?: string | string[]) => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
};

export const AddMomentList = () => {
    const MOMENTS_PER_PAGE = 15;
    const { authUser } = useAuth();
    const [moments, setMoments] = useState<MomentListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMoment, setSelectedMoment] = useState<MomentListItem | null>(
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
    } = useForm<AddMomentFormFieldsType>({
        defaultValues: {
            title: "",
            type: "boisson",
            categorie: "café",
            temperature: "chaud",
            description: "",
            ingredients: "",
            allergènes: [],
            price: "",
        },
    });

    const selectedImage = watch("image");
    const hasNewImage = !!selectedImage?.[0];

    const fetchMoments = async () => {
        setIsLoading(true);
        try {
            const data = await getMoments();
            const normalized = data
                .map((moment) => ({
                    id: moment.id || "",
                    title: moment.title || "",
                    type: moment.type || "",
                    categorie: moment.categorie || "",
                    temperature: moment.temperature || "",
                    description: moment.description || "",
                    ingredients: moment.ingredients || "",
                    allergènes: moment.allergènes || [],
                    price: moment.price || "",
                    image: moment.image || null,
                }))
                .filter((moment) => !!moment.id) as MomentListItem[];
            setMoments(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des moments:", error);
            toast.error("Impossible de charger les moments.");
            setMoments([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMoments();
    }, []);

    const handleOpenEdit = (moment: MomentListItem) => {
        setSelectedMoment(moment);
        setImagePreview(moment.image);
        reset({
            title: moment.title,
            type: moment.type,
            categorie: moment.categorie,
            temperature: moment.temperature,
            description: moment.description,
            ingredients: toInputString(moment.ingredients),
            allergènes: toCheckboxArray(moment.allergènes),
            price: moment.price,
        });
    };

    const closeModal = () => {
        setSelectedMoment(null);
        setImagePreview(null);
    };

    const onSubmitEdit: SubmitHandler<AddMomentFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedMoment) return;
        setIsUpdating(true);

        const { image, ...momentData } = formData;
        let imageUrl = selectedMoment.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `moments/${authUser.displayName}-${imageFile.name}`,
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
            ...momentData,
            ingredients: toInputString(momentData.ingredients),
            allergènes: toCheckboxArray(momentData.allergènes),
            image: imageUrl,
        };

        const { error } = await firestoreUptadeDocument(
            "moments",
            selectedMoment.id,
            payload,
        );
        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setMoments((prev) =>
            prev.map((moment) =>
                moment.id === selectedMoment.id
                    ? { ...moment, ...(payload as Omit<MomentListItem, "id">) }
                    : moment,
            ),
        );
        toast.success("Moment modifié avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedMoment) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer ce moment ? Cette action est irréversible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        const { error } = await firestoreDeleteDocument(
            "moments",
            selectedMoment.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setMoments((prev) => prev.filter((moment) => moment.id !== selectedMoment.id));
        toast.success("Moment supprimé.");
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

    const filteredMoments = useMemo(() => {
        if (!normalizedSearchQuery) return moments;
        return moments.filter((moment) =>
            (moment.title || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(normalizedSearchQuery),
        );
    }, [moments, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredMoments.length / MOMENTS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const paginatedMoments = useMemo(() => {
        const start = (currentPage - 1) * MOMENTS_PER_PAGE;
        const end = start + MOMENTS_PER_PAGE;
        return filteredMoments.slice(start, end);
    }, [filteredMoments, currentPage]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Moments ajoutés
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher un moment par titre"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredMoments.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun moment trouvé pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {paginatedMoments.map((moment) => (
                            <Card
                                key={moment.id}
                                src={moment.image || undefined}
                                title={moment.title}
                                autor={moment.type}
                                onAction={() => handleOpenEdit(moment)}
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
                isOpen={!!selectedMoment}
                onClose={closeModal}
                title={selectedMoment?.title || "Modifier le moment"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-2xl"
            >
                {selectedMoment && (
                    <AddMomentForm
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
                                Supprimer le moment
                            </Button>
                        }
                    />
                )}
            </Modal>
        </div>
    );
};
