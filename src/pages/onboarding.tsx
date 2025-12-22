import Seo from "@/ui/components/seo";
import { REGISTERED } from "@/lib/session-status";
import { Session } from "@/ui/components/session/session";
import { OnboardingContainer } from "@/ui/modules/onboarding/onboarding.container";

export default function Onboarding() {
    return (
        <>
            <Seo
                title="Mon espace personnel - Inscription"
                description="Bienvenue sur Agora, enregistrement onboarding."
            />
            <Session sessionStatus={REGISTERED}>
                <OnboardingContainer />
            </Session>
        </>
    );
}
