"use client";

import { getBookBoxItems } from "@/api/book-box";
import { firestoreDeleteDocument, firestoreUpdateDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BookBoxItemDocument } from "@/types/book-box-item";
import { AddBookBoxItemFormFieldsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Modal } from "@/ui/design-system/modal";
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
    const [selectedItem, setSelectedItem] = useState<BookBoxListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const { register, handleSubmit, formState: { errors, isDirty }, reset, watch } =
        useForm<AddBookBoxItemFormFieldsType>();

    const hasNewImage = !!watch("image")?.[0];

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

    useEffect(() => { fetchItems(); }, []);

    const handleOpenEdit = (item: BookBoxListItem) => {
        setSelectedItem(item);
        setImagePreview(item.image);
        reset({ title: item.title, author: item.author, description: item.description });
    };

    const closeModal = () => { setSelectedItem(null); setImagePreview(null); };

    const handleToggleStatus = async (item: BookBoxListItem) => {
        const newStatus = item.status === "available" ? "reserved" : "available";
        const { error } = await firestoreUpdateDocument("bookBox", item.id, { status: newStatus });
        if (error) { toast.error(error.message); return; }
        setItems((prev) => prev.map((b) => b.id === item.id ? { ...b, status: newStatus } : b));
        toast.success(`Statut mis à jour : ${newStatus === "available" ? "Disponible" : "Réservé"}`);
    };

    const onSubmitEdit: SubmitHandler<AddBookBoxItemFormFieldsType> = async (formData) => {
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
            if (storageError) { setIsUpdating(false); toast.error(storageError.message); return; }
            imageUrl = url || imageUrl;
        }

        const payload = { ...itemData, image: imageUrl };
        const { error } = await firestoreUpdateDocument("bookBox", selectedItem.id, payload);

        if (error) { setIsUpdating(false); toast.error(error.message); return; }

        setItems((prev) => prev.map((b) => b.id === selectedItem.id ? { ...b, ...payload } : b));
        toast.success("Livre modifié avec succès.");
        setIsUpdating(false);
        closeModal();
    };

    const handleDelete = async () => {
        if (!selectedItem) return;
        if (!window.confirm("Veux-tu vraiment supprimer ce livre ? Cette action est irréversible.")) return;

        setIsDeleting(true);
        const { error } = await firestoreDeleteDocument("bookBox", selectedItem.id);
        if (error) { setIsDeleting(false); toast.error(error.message); return; }

        setItems((prev) => prev.filter((b) => b.id !== selectedItem.id));
        toast.success("Livre supprimé.");
        setIsDeleting(false);
        closeModal();
    };

    const normalizedSearch = useMemo(
        () => searchQuery.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(),
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

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

    useEffect(() => { setCurrentPage(1); }, [normalizedSearch]);
    useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const statusLabel = (status: BookBoxListItem["status"]) =>
        status === "available" ? "Disponible" : "Réservé";

    return (
        <div className="w-full mt-12">
            <Typo variant="title" component="h2" className="text-2xl mb-6 text-center uppercase underline">
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
                <div className="flex justify-center py-8"><Spinner size="large" /></div>
            ) : filteredItems.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">Aucun livre trouvé.</Typo>
            ) : (
                <>
                    <div className="w-full space-y-4">
                        {paginatedItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative rounded-lg border-2 border-primary/40 bg-foreground/40 p-4 flex items-center gap-4 hover:bg-foreground/60 transition-colors"
                            >
                                <div className="relative w-14 h-20 flex-shrink-0 rounded overflow-hidden">
                                    <Image
                                        src={item.image || DefaultImage}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Typo variant="para" weight="bold" className="truncate">{item.title}</Typo>
                                    <Typo variant="para" color="other" className="text-sm">{item.author}</Typo>
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
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button type="button" size="small" action={() => handleToggleStatus(item)}>
                                        {item.status === "available" ? "Réserver" : "Remettre dispo"}
                                    </Button>
                                    <Button type="button" size="small" action={() => handleOpenEdit(item)}>
                                        Modifier
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button
                                type="button" size="small"
                                variant={currentPage === 1 ? "disabled" : "primary"}
                                disabled={currentPage === 1}
                                action={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                icon={{ icon: FaChevronLeft }} iconPosition="left"
                            >
                                Précédent
                            </Button>
                            <Typo variant="para" component="p">Page {currentPage} / {totalPages}</Typo>
                            <Button
                                type="button" size="small"
                                variant={currentPage === totalPages ? "disabled" : "primary"}
                                disabled={currentPage === totalPages}
                                action={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                icon={{ icon: FaChevronRight }} iconPosition="right"
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
                            form={{ errors, register, handleSubmit, onSubmit: onSubmitEdit, isLoading: isUpdating }}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                            submitLabel="Valider les modifications"
                            isSubmitDisabled={!isDirty && !hasNewImage}
                            footer={
                                <Button type="button" variant="danger" action={handleDelete} isLoading={isDeleting}>
                                    Supprimer le livre
                                </Button>
                            }
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};
