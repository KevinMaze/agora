import { FormsType } from "@/types/form";
import { Input } from "@/ui/design-system/form/input";

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
        </form>
    );
};

// Episode 26 1.02.54
