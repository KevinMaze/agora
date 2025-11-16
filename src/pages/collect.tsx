import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { CollectPageContainer } from "@/ui/modules/collect/collect-page.container";

export default function CollectPage() {
    return (
        <>
            <Seo
                title="Agora - La Bibliothèque"
                description="Découvrez notre sélection de livre du jours"
            />
            <Layout>
                <CollectPageContainer />
            </Layout>
        </>
    );
}
