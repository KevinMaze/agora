import { LayoutBack } from "@/ui/components/layout/layout-back";
import Seo from "@/ui/components/seo";
import { LoginContainer } from "@/ui/modules/authentification/login/login.container";

export default function Connexion() {
    return (
        <>
            <Seo
                title="L'Agora - Connexion - espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, connectez-vous à votre espace personnel."
            />

            <LayoutBack>
                <LoginContainer />
            </LayoutBack>
        </>
    );
}
