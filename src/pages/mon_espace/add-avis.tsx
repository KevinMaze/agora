import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AdminAccountAvisContainer } from "@/ui/modules/admin-profile/admin-account-avis/admin-account-avis-container";

export default function AddAvis() {
    return (
        <>
            <Seo
                title="Mon espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, connectez-vous à votre espace personnel."
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AdminAccountAvisContainer />
            </Layout>
        </>
    );
}
