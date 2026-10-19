import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddMomentAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-moment/add-moment-admin-account-container";

export default function AddMoment() {
    return (
        <>
            <Seo
                title="Suggestion du moment – Mon espace | L'Agora"
                description="Gérez la suggestion du moment du coffee shop."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddMomentAdminAccountContainer />
            </Layout>
        </>
    );
}
