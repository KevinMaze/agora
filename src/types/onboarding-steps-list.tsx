export interface BaseComponentProps {
    nextStep: () => void;
    prevStep: () => void;
    isFirstStep: () => boolean;
    isFinalStep: () => boolean;
    stepsList: onboardingSteplistInterface[];
    getCurrentStep: () => onboardingSteplistInterface | undefined;
}

export interface onboardingSteplistInterface {
    id: number;
    label: string;
    component: {
        step: React.ComponentType<BaseComponentProps>;
    };
}
