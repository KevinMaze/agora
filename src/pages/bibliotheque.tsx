import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { BibliothequeContainer } from "@/ui/modules/bibliotheque-page/bibliotheque.container";

export default function BibliothequePage() {
    return (
        <>
            <Seo
                title="La Bibliothèque – Catalogue & coups de cœur | L'Agora"
                description="Parcourez le catalogue de livres de L'Agora : nouveautés, coups de cœur de l'équipe et avis des lecteurs. Filtrez par genre et par année de sortie."
            />
            <Layout>
                <BibliothequeContainer />
            </Layout>
        </>
    );
}
