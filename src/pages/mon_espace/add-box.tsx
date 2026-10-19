import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddBoxAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-box/add-box-admin-account-container";

export default function AddBox() {
    return (
        <>
            <Seo
                title="Gestion des box – Mon espace | L'Agora"
                description="Ajoutez et gérez les box littéraires proposées en click & collect."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddBoxAdminAccountContainer />
            </Layout>
        </>
    );
}
