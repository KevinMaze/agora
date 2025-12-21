import { firebaseLogoutUser } from "@/api/authentication";
import { Button } from "@/ui/design-system/button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ActiveLink } from "../navbar/active-link";
import { Typo } from "@/ui/design-system/typography";

export const UserAccountNavigation = () => {
    const router = useRouter();
    const handleLogoutUser = async () => {
        const { error } = await firebaseLogoutUser();
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Vous êtes déconnecté.e. À bientôt sur l'Agora !");
    };
    return (
        <div className="flex flex-col gap-7 border-2 border-primary p-8 rounded-lg">
            <div className="flex flex-col gap-3">
                <Typo variant="para">
                    <ActiveLink href="/mon_espace">Mon espace</ActiveLink>
                </Typo>
                <Typo variant="para">
                    <ActiveLink href="/mon-espace">Mes livres</ActiveLink>
                </Typo>
            </div>
            <Button variant="danger" action={handleLogoutUser}>
                Déconnexion
            </Button>
        </div>
    );
};
