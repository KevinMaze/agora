import { Container } from "@/ui/components/container";
import BookBox from "@/../public/assets/images/book_box.jpg";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";
import { Card } from "@/ui/design-system/card";

export const SoldCollect = () => {
    const sold = [
        {
            src: { BookBox },
            alt: "",
            title: "Box du mois",
            price: "59.95",
        },
    ];

    return (
        <Container>
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mb-20 uppercase underline text-end mr-20 text-4xl"
            >
                Les Box du moments
            </Typo>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                {[...sold, ...sold, ...sold].map((book, index) => (
                    <Card
                        key={index}
                        alt={sold.alt}
                        title="Box du mois"
                        price="59.95"
                    ></Card>
                ))}
            </div>
        </Container>
    );
};
