import { LayoutBack } from "@/ui/components/layout/layout-back";
import { GUEST } from "@/lib/session-status";

import Seo from "@/ui/components/seo";
import { RegisterContainer } from "@/ui/modules/authentification/register/register.container";

export default function Register() {
    return (
        <>
            <Seo
                title="Créer un compte | L'Agora"
                description="Créez votre compte L'Agora pour donner votre avis sur les livres, réserver dans la boîte à livres et rejoindre la communauté."
            />

            <LayoutBack sessionStatus={GUEST}>
                <RegisterContainer />
            </LayoutBack>
        </>
    );
}
