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
    imagePreviews: string[];
    setImagePreviews: (value: string[]) => void;
    submitLabel?: string;
    isSubmitDisabled?: boolean;
    footer?: React.ReactNode;
}

export const AddConcertForm = ({
    form,
    imagePreviews,
    setImagePreviews,
    submitLabel = "Ajouter le concert",
    isSubmitDisabled = false,
    footer,
}: Props) => {
    const { register, errors, isLoading, handleSubmit, onSubmit } = form;

    const readFileAsDataUrl = (file: File) =>
        new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(String(event.target?.result || ""));
            };
            reader.readAsDataURL(file);
        });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const selectedFiles = files.slice(0, 3);
        Promise.all(selectedFiles.map(readFileAsDataUrl)).then((previews) => {
            setImagePreviews(previews.filter(Boolean));
        });
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
                placeholder="Titre du concert"
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
                placeholder="Description du concert"
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
                    alt="Apercu du concert"
                    src={imagePreviews[0] ? String(imagePreviews[0]) : Camera}
                />
                <div className="flex-1">
                    <label
                        htmlFor="image"
                        className={clsx(
                            isLoading ? "cursor-not-allowed" : "cursor-pointer",
                            "inline-block bg-primary hover:bg-secondary text-background rounded-2xl px-[15px] py-[10px] text-xl font-medium animated mb-2",
                        )}
                    >
                        Choisir jusqu'a 3 images
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        multiple
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
                    {imagePreviews.length > 0 && (
                        <p className="text-sm text-other">
                            {imagePreviews.length} image(s) selectionnee(s)
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
