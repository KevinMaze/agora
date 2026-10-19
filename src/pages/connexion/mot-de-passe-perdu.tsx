import { LayoutBack } from "@/ui/components/layout/layout-back";
import { GUEST } from "@/lib/session-status";
import Seo from "@/ui/components/seo";
import { ForgetPasswordContainer } from "@/ui/modules/authentification/forget-password/forget-password.container";

export default function ForgetPassword() {
    return (
        <>
            <Seo
                title="Mot de passe oublié | L'Agora"
                description="Réinitialisez le mot de passe de votre espace personnel L'Agora."
                noIndex
            />

            <LayoutBack sessionStatus={GUEST}>
                <ForgetPasswordContainer />
            </LayoutBack>
        </>
    );
}
