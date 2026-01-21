import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import Image from "next/image";

export const WelcomeStep = ({
    nextStep,
    isFirstStep,
    isFinalStep,
    getCurrentStep,
    stepsList,
}: BaseComponentProps) => {
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
                                Bienvenue !
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
                        <div className="w-full">
                            <Image
                                src="/assets/images/welcome-book.png"
                                alt="Welcome"
                                width={811}
                                height={596}
                                className="-rotate-25"
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <OnboardingFooter
                nextStep={nextStep}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
            />
        </div>
    );
};
