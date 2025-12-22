import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Button } from "@/ui/design-system/button";

export const WelcomeStep = ({ nextStep }: BaseComponentProps) => {
    return (
        <div>
            Bienvenue wesh
            <Button action={nextStep}>Suivant</Button>
        </div>
    );
};
