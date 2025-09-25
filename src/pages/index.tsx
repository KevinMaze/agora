import Seo from "@/ui/components/seo";
import { Typo } from "@/ui/design-system/typography";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora"
                description="Bienvenue sur Agora, le coffee shop littéraire."
            />

            <main>
                <div className="bg-background">
                    <h1 className="text-primary font-serif text-4xl text-center">
                        Bienvenue sur Agora
                    </h1>
                    <p className="font-serif text-4xl text-primary">
                        hello world
                    </p>
                    <Typo className="font-sans text-4xl text-primary">
                        hello world
                    </Typo>
                    <Typo
                        variant="title"
                        components="h1"
                        color="primary"
                        weight="normal"
                        className="text-center"
                    >
                        Bienvenue sur Agora
                    </Typo>
                    <Typo
                        variant="para"
                        components="h1"
                        color="primary"
                        weight="extrabold"
                        className="text-center"
                    >
                        Bienvenue sur Agora
                    </Typo>
                </div>
            </main>
        </>
    );
}
