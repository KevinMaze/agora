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

export const AddMomentForm = ({
    form,
    imagePreview,
    setImagePreview,
    submitLabel = "Ajouter le moment",
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
                placeholder="Nom du moment"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un nom"
                id="title"
                required={true}
            />
            <Input
                label="Type"
                isLoading={isLoading}
                placeholder="Boisson ou gourmandise"
                type="select"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un type"
                id="type"
                required={true}
                options={[
                    { value: "boisson", label: "boisson" },
                    { value: "gourmandise", label: "gourmandise" },
                ]}
            />
            <Input
                label="Catégorie"
                isLoading={isLoading}
                placeholder="Catégorie"
                type="select"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner une catégorie"
                id="categorie"
                required={true}
                options={[
                    { value: "café", label: "café" },
                    { value: "chocolat", label: "chocolat" },
                    { value: "jus", label: "jus" },
                    { value: "thé", label: "thé" },
                    { value: "biscuits", label: "biscuits" },
                    { value: "sandwich", label: "sandwich" },
                    { value: "dessert", label: "dessert" },
                ]}
            />
            <Input
                label="Température"
                isLoading={isLoading}
                placeholder="Température"
                type="select"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner une température"
                id="temperature"
                required={true}
                options={[
                    { value: "chaud", label: "chaud" },
                    { value: "froid", label: "froid" },
                ]}
            />

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description"
                register={register}
                errors={errors}
                errorMsg="Décris-nous le moment"
                id="description"
                required={true}
            />

            <Input
                label="Ingrédients"
                isLoading={isLoading}
                placeholder="Ingrédients"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner la liste des ingrédients"
                id="ingredients"
                required={true}
            />

            <Input
                label="Allergènes"
                isLoading={isLoading}
                placeholder="Allergènes"
                type="checkbox"
                register={register}
                errors={errors}
                errorMsg="Donne-nous la liste des allergènes"
                id="allergènes"
                options={[
                    { value: "gluten", label: "Céréales contenant du gluten" },
                    { value: "crustaces", label: "Crustacés" },
                    { value: "oeufs", label: "Œufs" },
                    { value: "poissons", label: "Poissons" },
                    { value: "arachides", label: "Arachides" },
                    { value: "soja", label: "Soja" },
                    { value: "lait", label: "Lait" },
                    { value: "fruits-a-coque", label: "Fruits à coque" },
                    { value: "celeri", label: "Céleri" },
                    { value: "moutarde", label: "Moutarde" },
                    { value: "sesame", label: "Graines de sésame" },
                    {
                        value: "sulfites",
                        label: "Anhydride sulfureux et sulfites",
                    },
                    { value: "lupin", label: "Lupin" },
                    { value: "mollusques", label: "Mollusques" },
                ]}
                required={true}
            />

            <Input
                label="Prix"
                isLoading={isLoading}
                placeholder="Prix"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner le prix"
                id="price"
                required={true}
            />

            <div className="flex items-center text-center gap-4">
                <Avatar
                    size="very-large"
                    alt="Aperçu du moment"
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
