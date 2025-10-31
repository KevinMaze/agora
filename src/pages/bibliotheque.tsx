import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { BibliothequeContainer } from "@/ui/modules/bibliotheque-page/bibliotheque.container";

export default function BibliothequePage() {
    return (
        <>
            <Seo
                title="Agora - La Bibliothèque"
                description="Découvrez notre sélection de livre du jours"
            />
            <Layout>
                <BibliothequeContainer />
            </Layout>
        </>
    );
}
