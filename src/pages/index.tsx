import Seo from "@/ui/components/seo";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora"
                description="Bienvenue sur Agora, le coffee shop littéraire."
            />

            <main>
                <div>
                    <Button> Clique moi</Button>
                </div>
            </main>
        </>
    );
}
