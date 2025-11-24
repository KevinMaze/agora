import { LayoutBack } from "@/ui/components/layout/layout-back";
import Seo from "@/ui/components/seo";
import { ForgetPasswordContainer } from "@/ui/modules/authentification/forget-password/forget-password.container";

export default function ForgetPassword() {
    return (
        <>
            <Seo
                title="L'Agora - Mot de passe publié - espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, changez votre mot de passe à votre espace personnel."
            />

            <LayoutBack>
                <ForgetPasswordContainer />
            </LayoutBack>
        </>
    );
}
