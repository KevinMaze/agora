import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { HomePageContainer } from "@/ui/modules/home-page/home-page.container";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora"
                description="Bienvenue sur Agora, le coffee shop littéraire."
            />

            <Layout>
                <HomePageContainer />
            </Layout>
        </>
    );
}
