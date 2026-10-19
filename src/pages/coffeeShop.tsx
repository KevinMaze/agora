import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { CoffeeShopContainer } from "@/ui/modules/coffeeShop-page/coffeeShop-page.container";

export default function CoffeeShopPage() {
    return (
        <>
            <Seo
                title="Coffee Shop – Boissons & gourmandises | L'Agora"
                description="Découvrez la carte du coffee shop de L'Agora à Nîmes : boissons et gourmandises inspirées d'œuvres littéraires, recettes et suggestion du moment."
            />
            <Layout>
                <CoffeeShopContainer />
            </Layout>
        </>
    );
}
