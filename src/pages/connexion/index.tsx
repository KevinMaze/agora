import { GUEST } from "@/lib/session-status";
import { LayoutBack } from "@/ui/components/layout/layout-back";
import Seo from "@/ui/components/seo";
import { LoginContainer } from "@/ui/modules/authentification/login/login.container";

export default function Connexion() {
    return (
        <>
            <Seo
                title="Connexion à votre espace | L'Agora"
                description="Connectez-vous à votre espace personnel L'Agora pour donner votre avis sur les livres et réserver dans la boîte à livres."
            />

            <LayoutBack sessionStatus={GUEST}>
                <LoginContainer />
            </LayoutBack>
        </>
    );
}
