import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { CollectPageContainer } from "@/ui/modules/collect/collect-page.container";

export default function CollectPage() {
    return (
        <>
            <Seo
                title="Click & Collect – Box littéraires | L'Agora"
                description="Commandez nos box littéraires en click & collect : formats standard ou XXL, livres neufs ou d'occasion, goodies et surprises de saison. Idéal pour offrir !"
            />
            <Layout>
                <CollectPageContainer />
            </Layout>
        </>
    );
}
