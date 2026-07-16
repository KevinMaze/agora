import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import Image from "next/image";
import Avatar from "@/../public/assets/images/avatar-test.png";

export const WelcomeStep = ({
    nextStep,
    isFirstStep,
    isFinalStep,
    getCurrentStep,
    stepsList,
}: BaseComponentProps) => {
    return (
        <div className="relative h-screen pb-[70px]">
            <div className="h-full overflow-auto">
                <Container className="grid h-full grid-cols-1 md:grid-cols-12">
                    <div className="relative z-10 flex items-center h-full order-2 md:order-1 md:col-span-6">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs
                                tabs={stepsList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typo
                                variant="title"
                                components="h2"
                                className="uppercase text-4xl text-center sm:text-5xl md:text-left lg:text-6xl"
                            >
                                Bienvenue !
                            </Typo>
                            <Typo
                                variant="para"
                                components="p"
                                className="text-center md:text-left"
                            >
                                Bienvenu sur le site de l'Agora. Tu es sur le
                                point de créer ton espace perso pour intéragir
                                avec les autres membres.
                            </Typo>
                        </div>
                    </div>
                    <div className="flex items-center h-full order-1 md:order-2 md:col-span-6 md:py-0 ">
                        <div className="w-full max-w-[280px] mx-auto sm:max-w-sm md:max-w-none">
                            <Image
                                src={Avatar}
                                alt="Welcome"
                                width={811}
                                height={596}
                                className="w-full h-auto"
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
