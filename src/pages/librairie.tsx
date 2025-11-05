import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { LibrairieContainer } from "@/ui/modules/librairie-page/librairie.container";

export default function LibrairiePage() {
    return (
        <>
            <Seo title="" description="" />

            <Layout>
                <LibrairieContainer />
            </Layout>
        </>
    );
}
