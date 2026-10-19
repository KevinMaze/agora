import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddUsersAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-users/add-users-admin-account.container";

export default function AddBook() {
    return (
        <>
            <Seo
                title="Gestion des utilisateurs – Mon espace | L'Agora"
                description="Ajoutez et gérez les comptes utilisateurs."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddUsersAdminAccountContainer />
            </Layout>
        </>
    );
}
