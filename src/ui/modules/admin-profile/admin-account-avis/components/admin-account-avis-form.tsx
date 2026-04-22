import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import { Typo } from "@/ui/design-system/typography";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type ReviewEditFormFields = {
    firstName: string;
    lastName: string;
    pseudo: string;
    avatar: string;
    moderationStatus: "pending" | "approved" | "rejected";
    review: string;
};

interface Props {
    register: UseFormRegister<ReviewEditFormFields>;
    handleSubmit: UseFormHandleSubmit<ReviewEditFormFields>;
    errors: Record<string, { message?: string } | undefined>;
    isLoading: boolean;
    onSubmit: SubmitHandler<ReviewEditFormFields>;
    isSubmitDisabled?: boolean;
    footer?: React.ReactNode;
    bookTitle?: string;
    bookId?: string;
}

export const AdminAccountAvisForm = ({
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    isSubmitDisabled = false,
    footer,
    bookTitle,
    bookId,
}: Props) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded-xl border-2 border-primary/40 bg-foreground/40 p-4 space-y-2">
                <Typo variant="para" component="p" weight="bold">
                    Livre concerné
                </Typo>
                <Typo variant="para" component="p" color="other">
                    {bookTitle || "Non renseigné"}
                </Typo>
                <Typo variant="para" component="p" color="secondary">
                    UID: {bookId || "Non renseigné"}
                </Typo>
            </div>

            <Input
                id="firstName"
                label="Prénom"
                type="text"
                placeholder="Prénom"
                register={register}
                errors={errors}
                isLoading={isLoading}
                required={false}
            />

            <Input
                id="lastName"
                label="Nom"
                type="text"
                placeholder="Nom"
                register={register}
                errors={errors}
                isLoading={isLoading}
                required={false}
            />

            <Input
                id="pseudo"
                label="Pseudo"
                type="text"
                placeholder="Pseudo"
                register={register}
                errors={errors}
                isLoading={isLoading}
                required={false}
            />

            <Input
                id="avatar"
                label="Avatar (URL)"
                type="text"
                placeholder="https://..."
                register={register}
                errors={errors}
                isLoading={isLoading}
                required={false}
            />

            <Input
                id="moderationStatus"
                label="Statut de modération"
                type="select"
                placeholder="Choisir un statut"
                register={register}
                errors={errors}
                isLoading={isLoading}
                options={[
                    { value: "pending", label: "En attente" },
                    { value: "approved", label: "Validé" },
                    { value: "rejected", label: "Refusé" },
                ]}
            />

            <Textarea
                id="review"
                label="Avis"
                rows={8}
                placeholder="Texte de l'avis"
                register={register}
                errors={errors}
                isLoading={isLoading}
                errorMsg="Un avis est requis."
            />

            <Button
                type="submit"
                isLoading={isLoading}
                disabled={isSubmitDisabled}
            >
                Enregistrer les modifications
            </Button>

            {footer}
        </form>
    );
};
