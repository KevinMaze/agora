import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { AproposContainer } from "@/ui/modules/apropos/apropos.container";

export default function AboutPage() {
    return (
        <>
            <Seo
                title="À propos & contact | L'Agora"
                description="L'histoire de L'Agora, librairie et coffee shop fondés par Jordan et Lavinia au 3 rue Crémieux à Nîmes. Retrouvez-nous sur la carte ou écrivez-nous."
            />
            <Layout>
                <AproposContainer />
            </Layout>
        </>
    );
}
