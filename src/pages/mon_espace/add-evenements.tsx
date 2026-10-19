import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddEvenementsAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-evenements/add-evenements-admin-account-container";

export default function AddEvenements() {
    return (
        <>
            <Seo
                title="Gestion des événements – Mon espace | L'Agora"
                description="Ajoutez et gérez les événements affichés dans la Gazette."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddEvenementsAdminAccountContainer />
            </Layout>
        </>
    );
}
