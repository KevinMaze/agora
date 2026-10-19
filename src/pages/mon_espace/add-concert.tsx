import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddConcertAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-concerts/add-concert-admin-account.container";

export default function AddEvenements() {
    return (
        <>
            <Seo
                title="Gestion des concerts – Mon espace | L'Agora"
                description="Ajoutez les concerts et photos affichés dans la Gazette."
                noIndex
            />

            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddConcertAdminAccountContainer />
            </Layout>
        </>
    );
}
