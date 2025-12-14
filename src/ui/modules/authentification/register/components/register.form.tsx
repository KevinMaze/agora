import { FormsType } from "@/types/form";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";

interface Props {
    form: FormsType;
}

export const RegisterForm = ({ form }: Props) => {
    const { register, handleSubmit, onSubmit, isLoading, errors } = form;
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
            <Input
                isLoading={isLoading}
                placeholder="Mot de passe"
                type="password"
                register={register}
                errors={errors}
                errorMsg="Ce champ est requis"
                id="password"
                required={true}
                isAutoCompleted={false}
            />
            <Input
                isLoading={isLoading}
                placeholder="Pseudo"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Ce champ est requis"
                id="username"
                required={false}
                isAutoCompleted={false}
            />

            <Button isLoading={isLoading} type="submit">
                {isLoading ? "Loading..." : "S'inscrire"}
            </Button>
        </form>
    );
};
