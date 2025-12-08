import { Container } from "@/ui/components/container";
import BookBox from "@/../public/assets/images/book_box.jpg";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";
import { Card } from "@/ui/design-system/card";

export const SoldCollect = () => {
    const sold = [
        {
            src: BookBox,
            alt: "",
            title: "Box du mois",
            price: "59.95",
        },
    ];

    return (
        <Container className="mb-20 sm:mt-50 -mt-180">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="uppercase underline sm:text-end sm:mr-10 text-center text-2xl sm:text-4xl lg:text-6xl mb-20"
            >
                Les Box du moments
            </Typo>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                {[...sold, ...sold, ...sold, ...sold, ...sold, ...sold].map(
                    (sold, index) => (
                        <Card
                            key={index}
                            src={sold.src}
                            alt={sold.alt}
                            title={sold.title}
                            price={sold.price}
                        ></Card>
                    )
                )}
            </div>
        </Container>
    );
};
