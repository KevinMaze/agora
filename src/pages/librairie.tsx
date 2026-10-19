import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { LibrairieContainer } from "@/ui/modules/librairie-page/librairie.container";

export default function LibrairiePage() {
    return (
        <>
            <Seo
                title="La Librairie & la boîte à livres | L'Agora"
                description="Découvrez la boîte à livres de L'Agora : prenez un livre, remplacez-le par un autre et laissez votre avis. Réservez les pépites déposées par la communauté."
            />

            <Layout>
                <LibrairieContainer />
            </Layout>
        </>
    );
}
