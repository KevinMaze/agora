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
        <Container className="mb-20 sm:mt-50 -mt-180 flex flex-col items-center">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="uppercase underline sm:text-end sm:mr-10 text-center text-2xl sm:text-4xl lg:text-6xl mb-20"
            >
                Les Box du moments
            </Typo>
            <div className="z-1 bg-foreground/80 p-5 rounded-3xl lg:w-[900px] text-center">
                <Typo
                    variant="para"
                    weight="normal"
                    className="text-secondary uppercase underline sm:text-xl"
                >
                    Choisis ton format :
                </Typo>

                <Typo
                    variant="para"
                    components="p"
                    weight="normal"
                    className="text-center m-5 sm:text-xl"
                    color="other"
                >
                    Pour chaque genre proposé dans les box, deux formats sont
                    disponibles : un standard et un XXL. Ces box s’adaptent à
                    vos budgets et à vos envies !
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        Standard :
                    </Typo>
                    - Un livre de poche neuf - Goodies - Pochette livres.
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        Standard d’occasion :
                    </Typo>
                    - 3 livres d’occasion - Goodies - Un café suspendu (offert).
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-tier uppercase underline m-5"
                    >
                        XXL :
                    </Typo>
                    - Un livre grand format neuf et un livre petit format neuf -
                    Un textile (écharpe, t-shirt, tote bag). - Un goodies - Un
                    coupon -20% dans le magasin.
                    <br />
                    <br />
                    Pour tout premier achat de box, vous avez{" "}
                    <span className="text-tier">20 points offerts</span> sur
                    votre compte fidélité.
                </Typo>
            </div>
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
                    ),
                )}
            </div>
        </Container>
    );
};
