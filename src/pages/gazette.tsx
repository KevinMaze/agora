import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { GazetteContainer } from "@/ui/modules/gazette/gazette-page.container";

export default function GazettePage() {
    return (
        <>
            <Seo
                title="La Gazette – Événements & concerts | L'Agora"
                description="Suivez l'actualité de L'Agora : événements à venir, concerts trimestriels du Hard Rock Coffee, lives et galerie photo de nos soirées."
            />

            <Layout>
                <GazetteContainer />
            </Layout>
        </>
    );
}
