import { FormsType } from "@/types/form";
import { Avatar } from "@/ui/design-system/avatar";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import clsx from "clsx";
import Camera from "@/../public/assets/images/camera.png";
import { ChangeEvent, useState } from "react";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
}

export const AddBookForm = ({ form, imagePreview, setImagePreview }: Props) => {
    const { register, errors, isLoading, handleSubmit, onSubmit } = form;

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result || null);
            };
            reader.readAsDataURL(file);
        }
    };
    const { onChange: rhfOnChange, ...rhfImageRegister } = register("image");
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
        >
            <Input
                label="Title"
                isLoading={isLoading}
                placeholder="Titre du livre"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un titre"
                id="title"
                required={true}
            />
            <Input
                label="Auteur"
                isLoading={isLoading}
                placeholder="Auteur"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un auteur"
                id="autor"
                required={true}
            />

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description"
                register={register}
                errors={errors}
                errorMsg="Décris un peu le livre ou entre le synopsis"
                id="description"
                required={true}
            />
            <div className="flex items-start gap-4">
                <Avatar
                    size="very-large"
                    alt="Aperçu de la couverture du livre"
                    src={imagePreview ? String(imagePreview) : Camera}
                />
                <div className="flex-1">
                    <label
                        htmlFor="image"
                        className={clsx(
                            isLoading ? "cursor-not-allowed" : "cursor-pointer",
                            "inline-block bg-primary hover:bg-secondary text-background rounded-2xl px-[15px] py-[10px] text-xl font-medium animated mb-2",
                        )}
                    >
                        Choisir une image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        disabled={isLoading}
                        {...rhfImageRegister}
                        onChange={(e) => {
                            rhfOnChange(e);
                            handleImageChange(e);
                        }}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">
                            {errors.image.message as string}
                        </p>
                    )}
                </div>
            </div>
            <Input
                label="Catégorie"
                isLoading={isLoading}
                placeholder="Catégorie"
                type="checkbox"
                register={register}
                errors={errors}
                errorMsg="Donne-nous la catégorie du livre"
                id="category"
                options={[
                    { value: "Triller", label: "Triller" },
                    { value: "Romance", label: "Romance" },
                    { value: "Action", label: "Action" },
                    { value: "Aventure", label: "Aventure" },
                    { value: "Science-fiction", label: "Science-fiction" },
                    { value: "Classique", label: "Classique" },
                    { value: "Policier", label: "Policier" },
                    { value: "Historique", label: "Historique" },
                    { value: "Fantastique", label: "Fantastique" },
                    { value: "Drame", label: "Drame" },
                    { value: "Horreur", label: "Horreur" },
                ]}
                required={true}
            />
            <Input
                label="Année de sortie"
                isLoading={isLoading}
                placeholder="Année de sortie"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Entre l'année de sortie"
                id="releaseYear"
                required={true}
            />

            <Button isLoading={isLoading} type="submit">
                {isLoading ? "Loading..." : "Ajouter le livre"}
            </Button>
        </form>
    );
};
