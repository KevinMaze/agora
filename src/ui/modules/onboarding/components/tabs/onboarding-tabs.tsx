import { onboardingSteplistInterface } from "@/types/onboarding-steps-list";
import { Typo } from "@/ui/design-system/typography";
import clsx from "clsx";
interface Props {
    tabs: onboardingSteplistInterface[];
    getCurrentStep: () => onboardingSteplistInterface | undefined;
}

export const OnboardingTabs = ({ tabs, getCurrentStep }: Props) => {
    return (
        <div className="relative inline-block">
            <div className="flex items-center space-x-6 ">
                {tabs &&
                    tabs.map(
                        (tab) =>
                            tab.id !== tabs.length && (
                                <div
                                    key={tab.id}
                                    className={clsx(
                                        getCurrentStep &&
                                            getCurrentStep()?.id === tab.id
                                            ? "border-primary border-b-[2px]"
                                            : "border-secondary",
                                        "relative z-10 py-2.5 ",
                                    )}
                                >
                                    <Typo
                                        variant="para"
                                        components="p"
                                        color={
                                            getCurrentStep &&
                                            getCurrentStep()?.id === tab.id
                                                ? "primary"
                                                : "secondary"
                                        }
                                        className="uppercase"
                                        weight={
                                            getCurrentStep &&
                                            getCurrentStep()?.id === tab.id
                                                ? "bold"
                                                : "normal"
                                        }
                                    >
                                        {tab.label}
                                    </Typo>
                                </div>
                            ),
                    )}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary"></div>
        </div>
    );
};
