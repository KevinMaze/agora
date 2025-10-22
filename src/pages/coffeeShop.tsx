import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { CoffeeShopContainer } from "@/ui/modules/coffeeShop/coffeeShop-page.container";

export default function CoffeeShopPage() {
    return (
        <>
            <Seo
                title="Agora - Coffee Shop"
                description="Découvrez notre sélection de cafés et de pâtisseries."
            />
            <Layout>
                <CoffeeShopContainer />
            </Layout>
        </>
    );
}
