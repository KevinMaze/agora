import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AdminAccountAvisContainer } from "@/ui/modules/admin-profile/admin-account-avis/admin-account-avis-container";

export default function AddAvis() {
    return (
        <>
            <Seo
                title="Modération des avis – Mon espace | L'Agora"
                description="Modérez les avis laissés par les lecteurs."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AdminAccountAvisContainer />
            </Layout>
        </>
    );
}
