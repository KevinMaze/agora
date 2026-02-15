import { FormsType } from "@/types/form";
import { Avatar } from "@/ui/design-system/avatar";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import clsx from "clsx";
import Camera from "@/../public/assets/images/camera.png";
import { ChangeEvent } from "react";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    setImagePreview: (value: string | ArrayBuffer | null) => void;
    submitLabel?: string;
    isSubmitDisabled?: boolean;
    footer?: React.ReactNode;
}

export const AddEvenementsForm = ({
    form,
    imagePreview,
    setImagePreview,
    submitLabel = "Ajouter l'événement",
    isSubmitDisabled = false,
    footer,
}: Props) => {
    const { register, errors, isLoading, handleSubmit, onSubmit } = form;

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result || null);
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
                label="Titre"
                isLoading={isLoading}
                placeholder="Titre de l'événement"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un titre"
                id="title"
                required={true}
            />

            <Input
                label="Date"
                isLoading={isLoading}
                type="date"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner une date"
                id="date"
                required={true}
            />

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description de l'événement"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner une description"
                id="description"
                required={true}
            />

            <Input
                label="Lien Facebook"
                isLoading={isLoading}
                placeholder="https://facebook.com/..."
                type="url"
                register={register}
                errors={errors}
                errorMsg="Lien Facebook invalide"
                id="facebook"
                required={false}
            />

            <Input
                label="Lien Instagram"
                isLoading={isLoading}
                placeholder="https://instagram.com/..."
                type="url"
                register={register}
                errors={errors}
                errorMsg="Lien Instagram invalide"
                id="instagram"
                required={false}
            />

            <Input
                label="Lien TikTok"
                isLoading={isLoading}
                placeholder="https://tiktok.com/@..."
                type="url"
                register={register}
                errors={errors}
                errorMsg="Lien TikTok invalide"
                id="tiktok"
                required={false}
            />

            <Input
                label="Lien YouTube"
                isLoading={isLoading}
                placeholder="https://youtube.com/..."
                type="url"
                register={register}
                errors={errors}
                errorMsg="Lien YouTube invalide"
                id="youtube"
                required={false}
            />

            <Input
                label="Lien X (Twitter)"
                isLoading={isLoading}
                placeholder="https://x.com/..."
                type="url"
                register={register}
                errors={errors}
                errorMsg="Lien X invalide"
                id="twitter"
                required={false}
            />

            <div className="flex items-center text-center gap-4">
                <Avatar
                    size="very-large"
                    alt="Aperçu de l'événement"
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

            <Button
                isLoading={isLoading}
                type="submit"
                disabled={isSubmitDisabled}
            >
                {isLoading ? "Loading..." : submitLabel}
            </Button>
            {footer}
        </form>
    );
};
