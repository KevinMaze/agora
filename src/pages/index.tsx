import Seo from "@/ui/components/seo";
import { Button } from "@/ui/design-system/button";
import { Spinner } from "@/ui/design-system/spinner";
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
                <div className="flex items-center gap-4 p-10">
                    <Spinner size="small" />
                    <Spinner variant="white" />
                    <Spinner size="large" />
                </div>

                <div className="flex items-center gap-4 p-10}">
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

                <div className="flex items-center gap-4 p-10}">
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

                <div className="flex items-center gap-4 p-10}">
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
            </main>
        </>
    );
}
