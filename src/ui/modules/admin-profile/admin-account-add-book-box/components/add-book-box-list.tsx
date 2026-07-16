"use client";

import {
    deleteBookBoxItemWithRelations,
    getBookBoxItems,
} from "@/api/book-box";
import { firestoreUpdateDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BookBoxItemDocument } from "@/types/book-box-item";
import { AddBookBoxItemFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Modal } from "@/ui/design-system/modal";
import { ModalAvis } from "@/ui/design-system/modal-avis";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import DefaultImage from "@/../public/assets/images/404.png";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddBookBoxForm } from "./add-book-box-form";

type BookBoxListItem = BookBoxItemDocument & { id: string };

const ITEMS_PER_PAGE = 15;

export const AddBookBoxList = () => {
    const { authUser } = useAuth();
    const [items, setItems] = useState<BookBoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<BookBoxListItem | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(null);
    const [releasedItem, setReleasedItem] = useState<BookBoxListItem | null>(
        null,
    );
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm<AddBookBoxItemFormFieldsType>();

    const hasNewImage = !!watch("image")?.[0];

    // Vérifie si l'utilisateur connecté est administrateur
    const isAdmin = authUser?.userDocument?.role === "admin";

    // Détermine si l'utilisateur peut remettre un livre à disposition :
    // uniquement l'admin OU la personne qui a emprunté le livre
    const canRelease = (item: BookBoxListItem) =>
        isAdmin || (!!authUser && item.reservedBy?.userId === authUser.uid);

    // Détermine si l'utilisateur peut modifier ou supprimer un livre :
    // uniquement l'admin OU la personne qui a enregistré le livre en BDD
    const canEdit = (item: BookBoxListItem) =>
        isAdmin || (!!authUser && item.userId === authUser.uid);

    // Charge tous les livres de la boîte depuis Firestore
    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const data = await getBookBoxItems();
            setItems(data.filter((item) => !!item.id) as BookBoxListItem[]);
        } catch {
            toast.error("Impossible de charger les livres de la boîte.");
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Ouvre la modal d'édition pré-remplie avec les données du livre sélectionné
    const handleOpenEdit = (item: BookBoxListItem) => {
        setSelectedItem(item);
        setImagePreview(item.image);
        reset({
            title: item.title,
            author: item.author,
            description: item.description,
        });
    };

    const closeModal = () => {
        setSelectedItem(null);
        setImagePreview(null);
    };

    // Passe un livre disponible au statut "réservé" et enregistre l'emprunteur en BDD,
    // indispensable pour que canRelease puisse identifier la personne autorisée à le libérer
    const handleReserve = async (item: BookBoxListItem) => {
        const reservedBy = {
            userId: authUser.uid,
            displayName:
                authUser.userDocument?.displayName ||
                authUser.displayName ||
                "Membre",
        };
        const { error } = await firestoreUpdateDocument("bookBox", item.id, {
            status: "reserved",
            reservedBy,
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        setItems((prev) =>
            prev.map((b) =>
                b.id === item.id
                    ? { ...b, status: "reserved" as const, reservedBy }
                    : b,
            ),
        );
        toast.success("Statut mis à jour : Réservé");
    };

    // Remet un livre à disposition (statut "available") et efface l'emprunteur.
    // Réservé à l'admin ou à la personne qui a emprunté le livre.
    const handleRelease = async (item: BookBoxListItem) => {
        if (!canRelease(item)) {
            toast.error(
                "Vous n'avez pas la permission de remettre ce livre à disposition.",
            );
            return;
        }
        const { error } = await firestoreUpdateDocument("bookBox", item.id, {
            status: "available",
            reservedBy: null,
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        setItems((prev) =>
            prev.map((b) =>
                b.id === item.id
                    ? { ...b, status: "available" as const, reservedBy: null }
                    : b,
            ),
        );
        toast.success("Statut mis à jour : Disponible");
        setReleasedItem(item);
    };

    const closeReleaseReviewPrompt = () => {
        setReleasedItem(null);
        setIsReviewModalOpen(false);
    };

    const onSubmitEdit: SubmitHandler<AddBookBoxItemFormFieldsType> = async (
        formData,
    ) => {
        if (!selectedItem) return;
        setIsUpdating(true);

        const { image, ...itemData } = formData;
        let imageUrl = selectedItem.image;
        const imageFile = image?.[0];

        if (imageFile) {
            const { data: url, error: storageError } = await storageUploadFile(
                `book-box/${authUser.displayName}-${imageFile.name}`,
                imageFile,
            );
            if (storageError) {
                setIsUpdating(false);
                toast.error(storageError.message);
                return;
            }
            imageUrl = url || imageUrl;
        }

        const payload = { ...itemData, image: imageUrl };
        const { error } = await firestoreUpdateDocument(
            "bookBox",
            selectedItem.id,
            payload,
        );

        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setItems((prev) =>
            prev.map((b) =>
                b.id === selectedItem.id ? { ...b, ...payload } : b,
            ),
        );
        toast.success("Livre modifié avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDeleteClick = () => {
        if (!selectedItem) return;
        setIsConfirmDeleteOpen(true);
    };

    const closeDeleteConfirm = () => {
        setIsConfirmDeleteOpen(false);
    };

    const confirmDelete = async () => {
        if (!selectedItem) return;

        setIsDeleting(true);
        const { error } = await deleteBookBoxItemWithRelations(
            selectedItem.id,
            selectedItem.image,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setItems((prev) => prev.filter((b) => b.id !== selectedItem.id));
        toast.success("Livre et avis associés supprimés.");
        setIsDeleting(false);
        setIsConfirmDeleteOpen(false);
        closeModal();
    };

    const normalizedSearch = useMemo(
        () =>
            searchQuery
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "")
                .toLowerCase()
                .trim(),
        [searchQuery],
    );

    const filteredItems = useMemo(() => {
        if (!normalizedSearch) return items;
        return items.filter((item) =>
            [item.title, item.author]
                .join(" ")
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "")
                .toLowerCase()
                .includes(normalizedSearch),
        );
    }, [items, normalizedSearch]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearch]);
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const statusLabel = (status: BookBoxListItem["status"]) =>
        status === "available" ? "Disponible" : "Réservé";

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Livres dans la boîte
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par titre ou auteur"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredItems.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun livre trouvé.
                </Typo>
            ) : (
                <>
                    <div className="w-full space-y-4">
                        {paginatedItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative my-shadow border-1 border-primary bg-foreground p-4 flex flex-col gap-4 hover:bg-foreground/60 transition-colors sm:flex-row sm:items-center"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="relative w-14 h-20 flex-shrink-0 rounded overflow-hidden">
                                        <Image
                                            src={item.image || DefaultImage}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Typo
                                            variant="para"
                                            weight="bold"
                                            className="truncate"
                                        >
                                            {item.title}
                                        </Typo>
                                        <Typo
                                            variant="para"
                                            color="other"
                                            className="text-sm"
                                        >
                                            {item.author}
                                        </Typo>
                                        {item.status === "reserved" &&
                                            item.reservedBy && (
                                                <Typo
                                                    variant="para"
                                                    color="secondary"
                                                    className="text-xs mt-0.5"
                                                >
                                                    Réservé par{" "}
                                                    {
                                                        item.reservedBy
                                                            .displayName
                                                    }
                                                </Typo>
                                            )}
                                        <span
                                            className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                                item.status === "available"
                                                    ? "bg-[var(--color-tier)]/20 text-[var(--color-tier)]"
                                                    : "bg-[var(--color-danger)]/20 text-[var(--color-danger)]"
                                            }`}
                                        >
                                            {statusLabel(item.status)}
                                        </span>
                                    </div>
                                </div>
                                {/* sm:ml-auto pousse les boutons à droite même quand certains sont absents */}
                                <div className="flex flex-wrap gap-2 sm:flex-shrink-0 sm:ml-auto">
                                    {/* Réserver : visible uniquement si le livre est disponible */}
                                    {item.status === "available" && (
                                        <Button
                                            type="button"
                                            size="small"
                                            action={() => handleReserve(item)}
                                        >
                                            Réserver
                                        </Button>
                                    )}
                                    {/* Remettre à disposition : visible uniquement si le livre est réservé
                                        ET que l'utilisateur est admin ou l'emprunteur du livre */}
                                    {item.status === "reserved" &&
                                        canRelease(item) && (
                                            <Button
                                                type="button"
                                                size="small"
                                                action={() =>
                                                    handleRelease(item)
                                                }
                                            >
                                                Remettre dispo
                                            </Button>
                                        )}
                                    {/* Modifier : visible uniquement pour l'admin ou celui qui a ajouté le livre */}
                                    {canEdit(item) && (
                                        <Button
                                            type="button"
                                            size="small"
                                            action={() => handleOpenEdit(item)}
                                        >
                                            Modifier
                                        </Button>
                                    )}
                                </div>
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
                                    setCurrentPage((p) => Math.max(1, p - 1))
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
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
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
                isOpen={!!selectedItem}
                onClose={closeModal}
                title={selectedItem?.title || "Modifier"}
                maxWidthClassName="max-w-2xl"
                contentClassName="!h-auto"
            >
                {selectedItem && (
                    <div className="flex flex-col gap-5">
                        <AddBookBoxForm
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
                            isSubmitDisabled={!isDirty && !hasNewImage}
                            footer={
                                <Button
                                    type="button"
                                    variant="danger"
                                    action={handleDeleteClick}
                                    isLoading={isDeleting}
                                >
                                    Supprimer le livre
                                </Button>
                            }
                        />
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={isConfirmDeleteOpen}
                onClose={closeDeleteConfirm}
                title="Supprimer définitivement ?"
                contentClassName="!h-auto"
            >
                {selectedItem && (
                    <div className="space-y-5 text-center">
                        <Typo variant="para" component="p">
                            Veux-tu vraiment supprimer «{" "}
                            {selectedItem.title} » ? Le livre, son image et
                            tous les avis associés seront définitivement
                            supprimés. Cette action est irréversible.
                        </Typo>
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                variant="danger"
                                action={confirmDelete}
                                isLoading={isDeleting}
                            >
                                Oui, supprimer
                            </Button>
                            <Button
                                type="button"
                                action={closeDeleteConfirm}
                                disabled={isDeleting}
                            >
                                Non
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={!!releasedItem && !isReviewModalOpen}
                onClose={closeReleaseReviewPrompt}
                title="Laisser un avis ?"
                contentClassName="!h-auto"
            >
                {releasedItem && (
                    <div className="space-y-5 text-center">
                        <Typo variant="para" component="p">
                            Veux-tu laisser un avis sur «{" "}
                            {releasedItem.title} » ?
                        </Typo>
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                action={() => setIsReviewModalOpen(true)}
                            >
                                Oui, laisser un avis
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                action={closeReleaseReviewPrompt}
                            >
                                Non merci
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <ModalAvis
                isOpen={isReviewModalOpen}
                onClose={closeReleaseReviewPrompt}
                bookId={releasedItem?.id}
                bookTitle={releasedItem?.title}
                bookImage={releasedItem?.image}
            />
        </div>
    );
};
