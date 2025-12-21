import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import { LayoutBack } from "@/ui/components/layout/layout-back";
import Seo from "@/ui/components/seo";
import { UserAccountContainer } from "@/ui/modules/user-profile/user-account/user-account.container";

export default function Onboarding() {
    return (
        <>
            <Seo
                title="Mon espace personnel - Inscription"
                description="Bienvenue sur Agora, enregistrement onboarding."
            />

            <LayoutBack sessionStatus={REGISTERED}>
                <UserAccountContainer />
                welcome
            </LayoutBack>
        </>
    );
}
