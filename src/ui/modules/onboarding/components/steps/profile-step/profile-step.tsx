import { Container } from "@/ui/components/container";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typo } from "@/ui/design-system/typography";
import { ProfileStepForm } from "./profile-step-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingProfileFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { firestoreUptadeDocument } from "@/api/firestore";
import { useAuth } from "@/context/AuthUserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const ProfileStep = ({
    nextStep,
    prevStep,
    isFirstStep,
    isFinalStep,
    getCurrentStep,
    stepsList,
}: BaseComponentProps) => {
    const { authUser } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToggle();
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        reset,
        setValue,
    } = useForm<OnboardingProfileFormFieldsType>();

    const { name, description, hobbies, styleLove } =
        authUser.userDocument || {};
    // Display value is exist
    useEffect(() => {
        if (authUser.userDocument) {
            const fieldsToUpdate: (
                | "name"
                | "description"
                | "hobbies"
                | "styleLove"
            )[] = ["name", "description", "hobbies", "styleLove"];

            for (const field of fieldsToUpdate) {
                setValue(field, authUser.userDocument[field]);
            }
        }
    }, []);

    const handleUptadeUserDocument = async (
        formData: OnboardingProfileFormFieldsType,
    ) => {
        console.log("user", authUser);
        const { error } = await firestoreUptadeDocument(
            "users",
            authUser.uid,
            formData,
        );
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        setLoading(false);
        reset();
        nextStep();
    };

    const onSubmit: SubmitHandler<OnboardingProfileFormFieldsType> = async (
        formData,
    ) => {
        setLoading(true);
        console.log("formData", formData);
        handleUptadeUserDocument(formData);
        if (
            name !== formData.name ||
            name !== formData.name ||
            description !== formData.description ||
            hobbies !== formData.hobbies ||
            styleLove !== formData.styleLove
        ) {
        }
        setLoading(false);
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
                prevStep={prevStep}
                nextStep={handleSubmit(onSubmit)}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
                isLoading={isLoading}
            />
        </div>
    );
};
