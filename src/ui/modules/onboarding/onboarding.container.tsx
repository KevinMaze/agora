import { useState } from "react";
import { OnboardingView } from "./onboarding.view";
import { WelcomeStep } from "./components/steps/welcome-step/welcome-step";
import { onboardingSteplistInterface } from "@/types/onboarding-steps-list";
import { ProfileStep } from "./components/steps/profile-step/profile-step";
import { AvatarStep } from "./components/steps/avatar-step/avatar-step";

export const OnboardingContainer = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const stepsList: onboardingSteplistInterface[] = [
        {
            id: 1,
            label: "Bienvenue",
            component: { step: WelcomeStep },
        },
        {
            id: 2,
            label: "Profile",
            component: { step: ProfileStep },
        },
        {
            id: 3,
            label: "Avatar",
            component: { step: AvatarStep },
        },
        {
            id: 4,
            label: "Final",
            component: { step: WelcomeStep },
        },
    ];

    const getCurrentStep = () => {
        return stepsList.find((el) => el.id === currentStep);
    };

    const nextStep = () => {
        if (currentStep < stepsList.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isFirstStep = () => {
        if (currentStep === 1) {
            return true;
        }
        return false;
    };

    const isFinalStep = () => {
        if (currentStep === stepsList.length) {
            return true;
        }
        return false;
    };

    return (
        <OnboardingView
            getCurrentStep={getCurrentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            stepsList={stepsList}
        />
    );
};
