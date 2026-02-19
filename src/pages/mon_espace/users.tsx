import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { UsersAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-users/users-admin-account.container";

export default function Users() {
    return (
        <>
            <Seo
                title="Mon espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, connectez-vous à votre espace personnel."
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <UsersAdminAccountContainer />
            </Layout>
        </>
    );
}
