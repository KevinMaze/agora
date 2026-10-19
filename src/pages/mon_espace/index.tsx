import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AdminAccountContainer } from "@/ui/modules/admin-profile/admin-account/admin-account.container";

export default function UserAccount() {
    return (
        <>
            <Seo
                title="Mon espace personnel | L'Agora"
                description="Gérez votre compte et votre profil L'Agora."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AdminAccountContainer />
            </Layout>
        </>
    );
}
