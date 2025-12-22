import { Button } from "@/ui/design-system/button";
import clsx from "clsx";

interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
    isFirstStep?: () => boolean;
    isFinalStep?: () => boolean;
    isLoading?: boolean;
}

export const OnboardingFooter = ({
    nextStep,
    prevStep,
    isFirstStep,
    isFinalStep,
    isLoading,
}: Props) => {
    let actionButtonTitle: string;

    if (isFirstStep && isFirstStep()) {
        actionButtonTitle = "Démarrer";
    } else if (isFinalStep && isFinalStep()) {
        actionButtonTitle = "Terminer";
    } else {
        actionButtonTitle = "Continuer";
    }
    return (
        <div className="absolute bottom-0 left-0 w-full p-5 bg-foreground border-t border-primary">
            <div
                className={clsx(
                    prevStep && !nextStep && "justify-start",
                    !prevStep && nextStep && "justify-end",
                    prevStep && nextStep && "justify-between",
                    "flex items-center gap-5"
                )}
            >
                {prevStep && (
                    <Button
                        disabled={isLoading}
                        variant={!isLoading ? "primary" : "disabled"}
                        action={prevStep}
                    >
                        Retour
                    </Button>
                )}
                {nextStep && (
                    <Button isLoading={isLoading} action={nextStep}>
                        {actionButtonTitle}
                    </Button>
                )}
            </div>
        </div>
    );
};
