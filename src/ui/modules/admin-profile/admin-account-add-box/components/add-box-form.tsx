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
}

export const AddBoxForm = ({ form, imagePreview, setImagePreview }: Props) => {
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
                label="Nom de la box"
                isLoading={isLoading}
                placeholder="Titre"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un titre"
                id="title"
                required={true}
            />

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description de la box"
                register={register}
                errors={errors}
                errorMsg="Décris la box"
                id="description"
                required={true}
            />

            <Input
                label="Format de la box"
                isLoading={isLoading}
                placeholder="Sélectionner un format"
                type="select"
                register={register}
                errors={errors}
                errorMsg="Tu dois sélectionner un format"
                id="type"
                required={true}
                options={[
                    { value: "standard", label: "Standard" },
                    {
                        value: "standard occasion",
                        label: "Standard occasion",
                    },
                    { value: "xxl", label: "XXL" },
                ]}
            />

            <Input
                label="Prix"
                isLoading={isLoading}
                placeholder="Prix"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un prix"
                id="price"
                required={true}
            />

            <div className="flex items-center text-center gap-4">
                <Avatar
                    size="very-large"
                    alt="Aperçu de la box"
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

            <Button isLoading={isLoading} type="submit">
                {isLoading ? "Loading..." : "Ajouter la box"}
            </Button>
        </form>
    );
};
