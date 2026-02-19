"use client";

import { getGalleryImages } from "@/api/gallery";
import { firestoreDeleteDocument } from "@/api/firestore";
import { storageDeleteFileByUrl } from "@/api/storage";
import { Button } from "@/ui/design-system/button";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type GalleryListItem = {
    id: string;
    image: string;
};

interface Props {
    refreshSignal?: number;
}

export const AddGalleryList = ({ refreshSignal = 0 }: Props) => {
    const [galleryImages, setGalleryImages] = useState<GalleryListItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchGallery = async () => {
        setIsLoading(true);
        try {
            const data = await getGalleryImages();
            const normalized = data
                .map((item) => ({
                    id: item.id || "",
                    image: item.image || "",
                }))
                .filter((item) => !!item.id && !!item.image);
            setGalleryImages(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement de la galerie:", error);
            toast.error("Impossible de charger la galerie.");
            setGalleryImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, [refreshSignal]);

    const toggleSelection = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const handleDeleteSelection = async () => {
        if (selectedIds.length === 0) return;

        const selectedItems = galleryImages.filter((item) =>
            selectedIds.includes(item.id),
        );
        if (selectedItems.length === 0) return;

        setIsDeleting(true);

        const storageResults = await Promise.all(
            selectedItems.map((item) => storageDeleteFileByUrl(item.image)),
        );
        const storageError = storageResults.find((result) => {
            if (!result.error) return false;
            return result.error.code !== "storage/object-not-found";
        })?.error;

        if (storageError) {
            setIsDeleting(false);
            toast.error(
                `Impossible de supprimer certaines images: ${storageError.message}`,
            );
            return;
        }

        const firestoreResults = await Promise.all(
            selectedItems.map((item) => firestoreDeleteDocument("gallery", item.id)),
        );
        const firestoreError = firestoreResults.find((result) => !!result.error)?.error;

        if (firestoreError) {
            setIsDeleting(false);
            toast.error(
                `Impossible de supprimer certaines entrees galerie: ${firestoreError.message}`,
            );
            return;
        }

        setGalleryImages((prev) =>
            prev.filter((item) => !selectedIds.includes(item.id)),
        );
        setSelectedIds([]);
        setIsDeleting(false);
        toast.success("Selection supprimee de la galerie.");
    };

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Galerie
            </Typo>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : galleryImages.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucune image dans la galerie.
                </Typo>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {galleryImages.map((item) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                            <div key={item.id} className="flex flex-col gap-2">
                                <div className="relative w-full h-28 overflow-hidden rounded-lg border border-primary">
                                    <Image
                                        src={item.image}
                                        alt="Image de galerie"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="small"
                                    variant={isSelected ? "danger" : "primary"}
                                    action={() => toggleSelection(item.id)}
                                >
                                    {isSelected ? "Selectionnee" : "Selectionner"}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-6 flex justify-center">
                <Button
                    type="button"
                    variant={selectedIds.length > 0 ? "danger" : "disabled"}
                    disabled={selectedIds.length === 0}
                    action={handleDeleteSelection}
                    isLoading={isDeleting}
                >
                    Supprimer la selection
                </Button>
            </div>
        </div>
    );
};
