import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { HomePageContainer } from "@/ui/modules/home-page/home-page.container";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora – Coffee shop & librairie littéraire à Nîmes"
                description="Bienvenue à L'Agora, coffee shop littéraire à Nîmes : librairie neuf et occasion, boissons et gourmandises inspirées d'œuvres, box littéraires et événements."
            />

            <Layout>
                <HomePageContainer />
            </Layout>
        </>
    );
}
