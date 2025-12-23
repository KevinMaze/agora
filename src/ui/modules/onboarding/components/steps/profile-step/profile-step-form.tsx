import { FormsType } from "@/types/form";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";

interface Props {
    form: FormsType;
}

export const ProfileStepForm = ({ form }: Props) => {
    const { register, errors, isLoading } = form;

    return (
        <form className="w-full max-w-md space-y-4">
            <Input
                label="Pseudo"
                isLoading={isLoading}
                placeholder="Pseudo"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un pseudo"
                id="displayName"
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
                options={[
                    { value: "Triller", label: "Triller" },
                    { value: "Romance", label: "Romance" },
                    { value: "Action", label: "Action" },
                    { value: "Aventure", label: "Aventure" },
                    { value: "Science-fiction", label: "Science-fiction" },
                ]}
            />
        </form>
    );
};
