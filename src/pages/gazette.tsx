import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { GazetteContainer } from "@/ui/modules/gazette/gazette-page.container";

export default function GazettePage() {
    return (
        <>
            <Seo title="" description="" />

            <Layout>
                <GazetteContainer />
            </Layout>
        </>
    );
}
