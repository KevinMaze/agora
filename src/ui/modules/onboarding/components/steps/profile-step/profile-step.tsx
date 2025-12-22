import { Container } from "@/ui/components/container";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typo } from "@/ui/design-system/typography";
import { ProfileStepForm } from "./profile-step-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingProfileFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";

export const ProfileStep = ({
    nextStep,
    prevStep,
    isFirstStep,
    isFinalStep,
    getCurrentStep,
    stepsList,
}: BaseComponentProps) => {
    const { value: isLoading, setValue: setLoading } = useToggle();
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        reset,
        setValue,
    } = useForm<OnboardingProfileFormFieldsType>();

    const onSubmit: SubmitHandler<OnboardingProfileFormFieldsType> = async (
        formData
    ) => {
        setLoading(true);

        nextStep();
    };

    return (
        <div className="relative h-screen pb-[85px]">
            <div className="h-full overflow-auto">
                <Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs
                                tabs={stepsList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typo
                                variant="title"
                                components="h1"
                                className="uppercase text-6xl"
                            >
                                Présente-toi !
                            </Typo>
                            <Typo variant="para" components="p">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Similique ab vitae inventore
                                voluptas laboriosam porro, ad, tenetur placeat
                                esse quasi omnis corporis error minus
                                reprehenderit sint pariatur magni iure tempora?
                            </Typo>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="flex justify-end w-full">
                            <ProfileStepForm
                                form={{
                                    errors,
                                    control,
                                    register,
                                    handleSubmit,
                                    onSubmit,
                                    isLoading,
                                }}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <OnboardingFooter
                nextStep={nextStep}
                prevStep={prevStep}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
            />
        </div>
    );
};
