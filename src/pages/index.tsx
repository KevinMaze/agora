import Seo from "@/ui/components/seo";
import { Button } from "@/ui/design-system/button";
import { Logo } from "@/ui/design-system/logo";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
// import { Typo } from "@/ui/design-system/typography";
import { AiFillAccountBook } from "react-icons/ai";

export default function Home() {
    return (
        <>
            <Seo
                title="L'Agora"
                description="Bienvenue sur Agora, le coffee shop littéraire."
            />

            {/* Typographie */}
            <div className="space-y-2 max-w-6xl mx-auto space-y-5 p-5">
                <Typo variant="title" weight="bold">
                    Bienvenue sur Agora
                </Typo>
                <div className="flex flex-col gap-5 border border-gray-400 divide-y-2 divide-gray-400 rounded">
                    <div className="pb-5 space-y-2">
                        <Typo variant="para" weight="bold">
                            Agora est une plateforme dédiée aux passionnés de
                            littérature, offrant un espace convivial pour
                            découvrir, partager et discuter de livres.
                        </Typo>
                    </div>
                </div>

                {/* Spinner et Button */}
                <div className="flex items-center gap-4 p-10">
                    <Spinner size="small" />
                    <Spinner variant="white" />
                    <Spinner size="large" />
                </div>

                <div className="flex items-center gap-4 p-10">
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
                </div>

                <div className="flex items-center gap-4 p-10">
                    <Button
                        isLoading
                        size="small"
                        icon={{ icon: AiFillAccountBook }}
                    >
                        Clique moi
                    </Button>
                    <Button
                        isLoading
                        size="medium"
                        icon={{ icon: AiFillAccountBook }}
                        iconPosition="left"
                    >
                        Clique moi
                    </Button>
                    <Button isLoading variant="disabled" disabled>
                        Clique moi
                    </Button>
                    <Button isLoading size="large">
                        {" "}
                        Clique moi
                    </Button>
                </div>

                <div className="flex items-center gap-4 p-10">
                    <Button
                        isLoading
                        iconTheme="primary"
                        size="small"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                    <Button
                        isLoading
                        size="medium"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                    <Button
                        isLoading
                        size="large"
                        variant="icon"
                        icon={{ icon: AiFillAccountBook }}
                    />
                </div>

                <div className="flex items-center gap-4 p-10">
                    <Logo size="very-small" />
                    <Logo size="small" />
                    <Logo />
                    <Logo size="large" />
                </div>
            </div>
        </>
    );
}
