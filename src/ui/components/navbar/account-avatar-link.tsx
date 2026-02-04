import { firebaseLogoutUser } from "@/api/authentication";
import { useAuth } from "@/context/AuthUserContext";
import { Avatar } from "@/ui/design-system/avatar";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";
import Link from "next/link";
import { toast } from "react-toastify";

export const AccountAvatarNavigationLink = () => {
    const handleLogoutUser = async () => {
        const { error } = await firebaseLogoutUser();
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Vous êtes déconnecté.e. À bientôt sur l'Agora !");
    };

    const { authUser } = useAuth();

    if (!authUser) {
        return null;
    }

    const { photoURL, displayName } = authUser;

    return (
        <Link
            href="/mon_espace"
            className="flex flex-col justify-center items-center gap-5"
        >
            <div className="flex flex-col items-center ">
                <Avatar
                    size="large"
                    alt={displayName ? displayName : "avatar de l'utilisateur"}
                    src={photoURL}
                />
                <Typo
                    variant="para"
                    className="mt-2 uppercase text-xl truncate max-w-[250px]"
                >
                    {displayName ? displayName : "Bienvenue"}
                </Typo>
                <Typo
                    variant="para"
                    className="text-[12px] mt-2 uppercase text-secondary"
                >
                    Mon Compte
                </Typo>
            </div>
            <div>
                <Button variant="danger" action={handleLogoutUser}>
                    Déconnexion
                </Button>
            </div>
        </Link>
    );
};
