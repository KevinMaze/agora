import { FormsType } from "@/types/form";
import { UploadAvatar } from "@/ui/components/upload-avatar/upload-avatar";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";

interface Props {
    form: FormsType;
    imagePreview: string | ArrayBuffer | null;
    uploadProgress: number;
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardAdmin = ({
    form,
    imagePreview,
    uploadProgress,
    handleImageSelect,
}: Props) => {
    const { onSubmit, errors, isLoading, register, handleSubmit } = form;
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-2 border-primary rounded-xl p-5 w-full space-y-4"
        >
            <div className="flex items-center justify-between py-5">
                <UploadAvatar
                    handleImageSelect={handleImageSelect}
                    imagePreview={imagePreview}
                    uploadProgress={uploadProgress}
                    isLoading={isLoading}
                />
            </div>

            <div className="grid sm:grid-cols-12 gap-6">
                <div className="sm:col-span-6 space-y-4">
                    <Input
                        label="Pseudo"
                        isLoading={isLoading}
                        placeholder="Pseudo"
                        type="text"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton pseudo"
                        id="displayName"
                    />
                    <Input
                        label="Email"
                        isLoading={isLoading}
                        placeholder="Email"
                        type="text"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton pseudo"
                        id="email"
                        readOnly
                        required={false}
                    />
                    <Input
                        label="Hobbies"
                        isLoading={isLoading}
                        placeholder="Hobbies"
                        type="text"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton/tes hobbies"
                        id="hobbies"
                    />
                    <Input
                        label="Style(s) Préféré(s)"
                        isLoading={isLoading}
                        type="checkbox"
                        register={register}
                        errors={errors}
                        errorMsg="Coche au moins un style"
                        id="styleLove"
                        options={[
                            { value: "Triller", label: "Triller" },
                            { value: "Romance", label: "Romance" },
                            { value: "Action", label: "Action" },
                            { value: "Aventure", label: "Aventure" },
                            {
                                value: "Science-fiction",
                                label: "Science-fiction",
                            },
                        ]}
                    />
                </div>
                <div className="sm:col-span-6 space-y-4">
                    <Input
                        label="Facebook"
                        isLoading={isLoading}
                        placeholder="Facebook"
                        type="url"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton facebook"
                        id="facebook"
                        required={false}
                    />
                    <Input
                        label="Instagram"
                        isLoading={isLoading}
                        placeholder="Instagram"
                        type="url"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton instagram"
                        id="instagram"
                        required={false}
                    />
                    <Input
                        label="Tiktok"
                        isLoading={isLoading}
                        placeholder="Tiktok"
                        type="url"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton tiktok"
                        id="tiktok"
                        required={false}
                    />
                    <Input
                        label="Youtube"
                        isLoading={isLoading}
                        placeholder="Youtube"
                        type="url"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton youtube"
                        id="youtube"
                        required={false}
                    />
                    <Input
                        label="Twitter"
                        isLoading={isLoading}
                        placeholder="Twitter"
                        type="url"
                        register={register}
                        errors={errors}
                        errorMsg="Tu dois renseigner ton twitter"
                        id="twitter"
                        required={false}
                    />
                </div>
            </div>

            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={15}
                placeholder="Description"
                register={register}
                errors={errors}
                errorMsg="Décris-toi un peu"
                id="description"
                required={false}
            />

            <div className="flex justify-end mt-5">
                <Button isLoading={isLoading} type="submit">
                    Enregistrer
                </Button>
            </div>
        </form>
    );
};
