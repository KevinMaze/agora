import { FormsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";

interface Props {
    form: FormsType;
}

export const ForgetPasswordForm = ({ form }: Props) => {
    const { register, handleSubmit, onSubmit, isLoading, errors, watch } = form;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-1/2 mt-4"
        >
            <Input
                isLoading={isLoading}
                placeholder="Email"
                type="email"
                register={register}
                errors={errors}
                errorMsg="Ce champ est requis"
                id="email"
                required={true}
                isAutoCompleted={false}
            />
            <Button isLoading={isLoading} type="submit">
                {isLoading ? "Loading..." : "Envoyer"}
            </Button>
        </form>
    );
};
