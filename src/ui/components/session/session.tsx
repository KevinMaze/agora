/**
 * Session — garde de route basé sur l'état d'authentification.
 *
 * Ce composant est placé dans chaque layout de page pour contrôler l'accès.
 * Il gère trois cas de protection :
 *
 *  1. sessionStatus="registered" → réservé aux utilisateurs connectés
 *     - Si connecté   : affiche les children
 *     - Si déconnecté : redirige vers /connexion
 *
 *  2. sessionStatus="guest" → réservé aux visiteurs non connectés (pages auth)
 *     - Si connecté   : redirige vers /mon_espace
 *     - Si déconnecté : affiche les children
 *
 *  3. Sans sessionStatus → page publique, accessible à tous
 *
 * Gestion de l'onboarding :
 *  - Si connecté mais onboarding non terminé → redirige vers /onboarding
 *  - Si sur /onboarding mais onboarding déjà terminé → redirige vers /mon_espace
 *
 * Un ScreenSpinner est affiché tant que la session est en cours de résolution
 * pour éviter le "flash" du contenu protégé avant la redirection.
 */
import { useAuth } from "@/context/AuthUserContext";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { SessionStatusTypes } from "@/types/session-status-types";
import { ScreenSpinner } from "@/ui/design-system/screen-spinner";
import { useRouter } from "next/router";

interface Props {
    children: React.ReactNode;
    sessionStatus?: SessionStatusTypes;
}

export const Session = ({ children, sessionStatus }: Props) => {
    const router = useRouter();
    const { authUserIsLoading, authUser } = useAuth();
    const onboardingIsCompleted = authUser?.userDocument?.onboardingIsCompleted;

    const shouldRedirectToOnboarding = () => {
        return (
            !authUserIsLoading &&
            authUser &&
            !onboardingIsCompleted &&
            router.asPath !== "/onboarding"
        );
    };

    const shouldNotRedirectToOnboarding = () => {
        return (
            !authUserIsLoading &&
            authUser &&
            onboardingIsCompleted &&
            router.asPath === "/onboarding"
        );
    };

    if (shouldRedirectToOnboarding()) {
        router.push("/onboarding");
        return <ScreenSpinner />;
    }

    if (shouldNotRedirectToOnboarding()) {
        router.push("/mon_espace");
        return <ScreenSpinner />;
    }

    if (sessionStatus === REGISTERED && !authUserIsLoading) {
        if (authUser) {
            return <>{children}</>;
        } else {
            router.push("/connexion");
        }
    }
    if (sessionStatus === GUEST && !authUserIsLoading) {
        if (!authUser) {
            return <>{children}</>;
        } else {
            router.push("/mon_espace");
        }
    }
    if (!sessionStatus && !authUserIsLoading) {
        return <>{children}</>;
    }

    // Session en cours de résolution → on affiche le spinner pour éviter tout flash
    return <ScreenSpinner />;
};
