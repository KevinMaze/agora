import { REGISTERED } from "@/lib/session-status";
import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AddBookBoxAdminAccountContainer } from "@/ui/modules/admin-profile/admin-account-add-book-box/add-book-box-admin-account-container";

export default function AddBookBox() {
    return (
        <>
            <Seo
                title="Boîte à livres — Administration"
                description="Gérez les livres disponibles dans la boîte à livres."
            />
            <Layout withSideBar sessionStatus={REGISTERED}>
                <AddBookBoxAdminAccountContainer />
            </Layout>
        </>
    );
}
