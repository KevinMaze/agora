import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { UsersAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-users/users-admin-account.container";

export default function Users() {
    return (
        <>
            <Seo
                title="Membres – Mon espace | L'Agora"
                description="Consultez les autres membres de la communauté L'Agora."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <UsersAdminAccountContainer />
            </Layout>
        </>
    );
}
