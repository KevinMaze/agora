import Seo from "@/ui/components/seo";
import { Button } from "@/ui/design-system/button";
// import { Typo } from "@/ui/design-system/typography";
import { AiFillAccountBook } from "react-icons/ai";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora"
                description="Bienvenue sur Agora, le coffee shop littéraire."
            />

            <main>
                <div>
                    <Button size="small" icon={{ icon: AiFillAccountBook }}>
                        Clique moi
                    </Button>
                    <Button
                        size="medium"
                        icon={{ icon: AiFillAccountBook }}
                        iconPosition="left"
                    >
                        Clique moi
                    </Button>
                    <Button variant="disabled" disabled>
                        Clique moi
                    </Button>
                    <Button size="large"> Clique moi</Button>
                    <Button
                        iconTheme="primary"
                        size="small"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                    <Button
                        size="medium"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                    <Button
                        size="large"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                </div>
            </main>
        </>
    );
}
