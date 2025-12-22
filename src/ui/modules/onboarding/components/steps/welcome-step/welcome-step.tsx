import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Button } from "@/ui/design-system/button";
import { OnboardingFooter } from "../../footer/onboarding-footer";

export const WelcomeStep = ({
    nextStep,
    isFirstStep,
    isFinalStep,
}: BaseComponentProps) => {
    return (
        <div className="relative h-screen ">
            Bienvenue wesh
            <OnboardingFooter
                nextStep={nextStep}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
            />
        </div>
    );
};
