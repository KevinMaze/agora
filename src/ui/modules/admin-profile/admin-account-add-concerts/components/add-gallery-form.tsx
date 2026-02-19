"use client";

import { firestoreAddDocument } from "@/api/firestore";
import { storageUploadFile } from "@/api/storage";
import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Camera from "@/../public/assets/images/camera.png";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { AddGalleryList } from "./add-gallery-list";

export const GalleryImages = () => {
    const { authUser } = useAuth();
    const { value: isLoading, setValue: setIsLoading } = useToggle();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [refreshSignal, setRefreshSignal] = useState(0);

    const readFileAsDataUrl = (file: File) =>
        new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(String(event.target?.result || ""));
            };
            reader.readAsDataURL(file);
        });

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const limitedFiles = files.slice(0, 5);
        setSelectedFiles(limitedFiles);

        if (files.length > 5) {
            toast.info("Maximum 5 images prises en compte.");
        }

        Promise.all(limitedFiles.map(readFileAsDataUrl)).then((results) => {
            setPreviews(results.filter(Boolean));
        });
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error("Tu dois selectionner au moins une image.");
            return;
        }

        if (selectedFiles.length > 5) {
            toast.error("Tu peux envoyer maximum 5 images.");
            return;
        }

        setIsLoading(true);

        const uploadResults = await Promise.all(
            selectedFiles.map((file) =>
                storageUploadFile(
                    `gallery/${authUser.displayName}-${Date.now()}-${file.name}`,
                    file,
                ),
            ),
        );

        const storageError = uploadResults.find((result) => !!result.error)?.error;
        if (storageError) {
            setIsLoading(false);
            toast.error(storageError.message);
            return;
        }

        const imageUrls = uploadResults
            .map((result) => result.data)
            .filter((url): url is string => !!url);

        const firestoreResults = await Promise.all(
            imageUrls.map((url) =>
                firestoreAddDocument("gallery", {
                    image: url,
                    userId: authUser.uid,
                    creation_date: new Date(),
                }),
            ),
        );

        const firestoreError = firestoreResults.find(
            (result) => !!result.error,
        )?.error;
        if (firestoreError) {
            setIsLoading(false);
            toast.error(firestoreError.message);
            return;
        }

        setSelectedFiles([]);
        setPreviews([]);
        setRefreshSignal((prev) => prev + 1);
        setIsLoading(false);
        toast.success("Images ajoutees a la galerie.");
    };

    return (
        <div className="w-full max-w-4xl mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Ajouter des images a la galerie
            </Typo>

            <div className="flex flex-col items-center gap-4">
                <label
                    htmlFor="gallery-images"
                    className="inline-block bg-primary hover:bg-secondary text-background rounded-2xl px-[15px] py-[10px] text-xl font-medium animated cursor-pointer"
                >
                    Choisir jusqu'a 5 images
                </label>
                <input
                    id="gallery-images"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    onChange={handleFilesChange}
                    disabled={isLoading}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
                    {(previews.length > 0
                        ? previews
                        : [String((Camera as { src: string }).src)]
                    ).map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            className="relative w-full h-24 overflow-hidden rounded-lg border border-primary"
                        >
                            <Image
                                src={src}
                                alt="Apercu galerie"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    isLoading={isLoading}
                    disabled={selectedFiles.length === 0}
                    action={handleUpload}
                >
                    Ajouter les images
                </Button>
            </div>

            <AddGalleryList refreshSignal={refreshSignal} />
        </div>
    );
};
