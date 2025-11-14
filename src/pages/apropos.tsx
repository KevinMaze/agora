import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AproposContainer } from "@/ui/modules/apropos/apropos.container";

export default function AboutPage() {
    return (
        <>
            <Seo
                title="Agora - La Bibliothèque"
                description="Découvrez notre sélection de livre du jours"
            />
            <Layout>
                <AproposContainer />
            </Layout>
        </>
    );
}
