import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Container } from "@/ui/components/container";
import { useCallback, useEffect, useRef } from "react";
import { Typo } from "@/ui/design-system/typography";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Logo } from "@/ui/design-system/logo";
import ReactCanvasConfetti from "react-canvas-confetti";
import { firestoreUptadeDocument } from "@/api/firestore";
import { on } from "events";
import { toast } from "react-toastify";

export const FinalStep = ({ isFinalStep }: BaseComponentProps) => {
    const { authUser, reloadAuthUserData } = useAuth();

    const { value: isLoading, toggle } = useToggle();

    //setting confetti animation
    const refAnimationInstance = useRef<any>(null);
    const getInstance = useCallback((instance: any) => {
        refAnimationInstance.current = instance;
    }, []);
    const makeShoot = useCallback((particleRatio: number, opts: any) => {
        const instance = refAnimationInstance.current;
        if (instance) {
            const fire = instance.confetti || instance;
            if (typeof fire === "function") {
                fire({
                    ...opts,
                    origin: { y: 0.7 },
                    particleCount: Math.floor(200 * particleRatio),
                });
            }
        }
    }, []);

    const fire = useCallback(() => {
        makeShoot(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        makeShoot(0.2, {
            spread: 60,
        });
        makeShoot(0.35, {
            spread: 26,
            decay: 0.91,
            scalar: 0.8,
        });
        makeShoot(0.1, {
            spread: 120,
            startVelocity: 30,
            decay: 0.92,
            scalar: 1.2,
        });
        makeShoot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, [makeShoot]);

    useEffect(() => {
        setTimeout(() => {
            fire();
        }, 50);
    }, []);

    const handleCloseOnboarding = async () => {
        toggle();
        const data = {
            onboardingIsCompleted: true,
        };
        const { error } = await firestoreUptadeDocument(
            "users",
            authUser.uid,
            data,
        );
        if (error) {
            toggle();
            toast.error(error.message);
            return;
        }
        reloadAuthUserData();
        toggle();
    };

    return (
        <>
            <ReactCanvasConfetti
                onInit={getInstance}
                style={{
                    zIndex: 9999,
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: -80,
                    left: 0,
                }}
            />
            <div className="relative h-screen pb-[85px]">
                <div className="h-full overflow-auto">
                    <Container className="h-full">
                        <div className="relative z-10 flex items-center h-full py-10">
                            <div className="w-full max-w-xl mx-auto space-y-5 pb-4.5">
                                <div className="flex justify-center">
                                    <Logo size="large" />
                                </div>
                                <Typo
                                    variant="title"
                                    components="h1"
                                    className="uppercase text-6xl text-center"
                                >
                                    Félicitation !
                                </Typo>
                                <Typo
                                    variant="para"
                                    components="p"
                                    className="text-center"
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Similique ab vitae
                                    inventore voluptas laboriosam porro, ad,
                                    tenetur placeat esse quasi omnis corporis
                                    error minus reprehenderit sint pariatur
                                    magni iure tempora?
                                </Typo>
                            </div>
                        </div>
                    </Container>
                </div>
                <OnboardingFooter
                    isFinalStep={isFinalStep}
                    nextStep={handleCloseOnboarding}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
};
