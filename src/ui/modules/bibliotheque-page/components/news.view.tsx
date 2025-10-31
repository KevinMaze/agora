import { Card } from "@/ui/design-system/card";
import Error from "@/../public/assets/images/404.png";
import { Typo } from "@/ui/design-system/typography";
import { Container } from "@/ui/components/container";

export const News = () => {
    const Book = [
        {
            src: Error,
            alt: "404",
            title: "404",
            description: "Page introuvable",
            autor: "John Doe",
        },
        {
            src: Error,
            alt: "404",
            title: "405",
            description: "Page introuvable",
            autor: "Jane Smith",
        },
        {
            src: Error,
            alt: "404",
            title: "406",
            description: "Page introuvable",
            autor: "Alice Johnson",
        },
    ];

    return (
        <Container>
            <Typo
                variant="para"
                components="h2"
                weight="bold"
                className="mb-20 mt-20 uppercase tracking-widest text-6xl underline text-center"
            >
                Nouveautées
            </Typo>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                {[...Book, ...Book].map((book, index) => (
                    <Card key={index} {...book} />
                ))}
            </div>
        </Container>
    );
};
