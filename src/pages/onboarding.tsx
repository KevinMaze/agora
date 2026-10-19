import Seo from "@/ui/components/seo";
import { REGISTERED } from "@/lib/session-status";
import { Session } from "@/ui/components/session/session";
import { OnboardingContainer } from "@/ui/modules/onboarding/onboarding.container";

export default function Onboarding() {
    return (
        <>
            <Seo
                title="Bienvenue – Complétez votre profil | L'Agora"
                description="Finalisez la création de votre compte L'Agora : complétez votre profil et choisissez votre avatar."
                noIndex
            />
            <Session sessionStatus={REGISTERED}>
                <OnboardingContainer />
            </Session>
        </>
    );
}
