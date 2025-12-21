import Sidebar from "../navbar/sidebar";
import { Session } from "../session/session";
import { SessionStatusTypes } from "@/types/session-status-types";

interface Props {
    children: React.ReactNode;
    sessionStatus?: SessionStatusTypes;
}

export const LayoutBack = ({ children, sessionStatus }: Props) => {
    return (
        <Session sessionStatus={sessionStatus}>
            <Sidebar />
            {children}
        </Session>
    );
};
