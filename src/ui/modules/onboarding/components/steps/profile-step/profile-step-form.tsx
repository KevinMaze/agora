import { FormsType } from "@/types/form";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import { BOOK_GENRES } from "@/constants/genres";

interface Props {
    form: FormsType;
}

export const ProfileStepForm = ({ form }: Props) => {
    const { register, errors, isLoading } = form;

    return (
        <form className="w-full max-w-md space-y-4">
            <Input
                label="Nom Prénom"
                isLoading={isLoading}
                placeholder="Nom Prénom"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un pseudo"
                id="name"
            />
            <Textarea
                label="Description"
                isLoading={isLoading}
                rows={5}
                placeholder="Description"
                register={register}
                errors={errors}
                errorMsg="Décris-toi un peu"
                id="description"
                required={false}
            />
            <Input
                label="Hobbies"
                isLoading={isLoading}
                placeholder="Hobbies"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Donne-nous tes hobbies"
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
                options={BOOK_GENRES}
            />
            <Input
                label="Facebook"
                isLoading={isLoading}
                placeholder="facebook.com/..."
                type="url"
                register={register}
                errors={errors}
                id="facebook"
                required={false}
            />
            <Input
                label="Instagram"
                isLoading={isLoading}
                placeholder="instagram.com/..."
                type="url"
                register={register}
                errors={errors}
                id="instagram"
                required={false}
            />
            <Input
                label="Tiktok"
                isLoading={isLoading}
                placeholder="tiktok.com/..."
                type="url"
                register={register}
                errors={errors}
                id="tiktok"
                required={false}
            />
            <Input
                label="Youtube"
                isLoading={isLoading}
                placeholder="youtube.com/..."
                type="url"
                register={register}
                errors={errors}
                id="youtube"
                required={false}
            />
            <Input
                label="Twitter"
                isLoading={isLoading}
                placeholder="x.com/..."
                type="url"
                register={register}
                errors={errors}
                id="twitter"
                required={false}
            />
        </form>
    );
};
