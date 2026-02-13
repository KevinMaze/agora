import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddBoxAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-box/add-box-admin-account-container";

export default function AddBox() {
    return (
        <>
            <Seo
                title="Mon espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, connectez-vous à votre espace personnel."
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddBoxAdminAccountContainer />
            </Layout>
        </>
    );
}
