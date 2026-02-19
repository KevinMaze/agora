import { Container } from "../container";
import { Footer } from "../footer/footer";
import Sidebar from "../navbar/sidebar";
import { useRouter } from "next/router";
import { UserAccountNavigation } from "../sidebar-user/user-account-navigation";
import { Session } from "../session/session";
import { SessionStatusTypes } from "@/types/session-status-types";
import { CallToActionSidebar } from "../call-to-action-sidebar/call-to-action-sidebar";

interface Props {
    children: React.ReactNode;
    withSideBar?: boolean;
    sessionStatus?: SessionStatusTypes;
}

export const Layout = ({ children, withSideBar, sessionStatus }: Props) => {
    const router = useRouter();
    let view: React.ReactElement = <></>;

    if (withSideBar) {
        view = (
            <Container className="mb-14">
                <div className="grid sm:grid-cols-12 gap-7">
                    <div className="sm:col-span-3 space-y-8">
                        <UserAccountNavigation />
                        <CallToActionSidebar />
                    </div>
                    <div className="sm:col-span-9">{children}</div>
                </div>
            </Container>
        );
    } else {
        view = <>{children}</>;
    }

    return (
        <Session sessionStatus={sessionStatus}>
            <Sidebar />
            {view}
            {!router.pathname.includes("/mon_espace") && <Footer />}
        </Session>
    );
};
