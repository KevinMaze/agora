import { useAuth } from "@/context/AuthUserContext";
import { ADMIN, GUEST, REGISTERED } from "@/lib/session-status";
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
    return <ScreenSpinner />;
};
