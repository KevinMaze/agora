import { Container } from "@/ui/components/container";
import Image from "next/image";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";

export const BookBox = () => {
    return (
        <Container className="mt-60 mb-50">
            <div className="relative h-90 sm:h-100 lg:h-150 w-full overflow-hidden rounded-3xl border-primary border-1">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/assets/images/book_box.jpg"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                    />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <Typo
                        variant="title"
                        components="h2"
                        weight="bold"
                        className="mt-3 uppercase underline pt-2 pl-10 justify-start lg:text-5xl sm:text-4xl text-2xl tracking-wider underline-offset-8"
                    >
                        Les box littéraires
                    </Typo>

                    <div className="text-center justify-center items-center flex  sm:pr-20 sm:pl-20 ">
                        <Typo
                            variant="para"
                            components="p"
                            weight="normal"
                            color="other"
                            className="text-center justify-cente text-[12px] lg:text-xl"
                        >
                            A l’intérieur plein de petites surprises vous
                            attendent : marque-page originaux, thé en vrac,
                            gourmandises, bougies, créations d’artisans locaux,
                            t-shirt et tote-bag, remises, playlist musicale
                            offerte… qui changeront en fonction des
                            disponibilités et des saisons. Alors n’hésitez plus
                            : anniversaires, fêtes nationales, départs à la
                            retraite, occasions spéciales, nos box littéraires
                            sauront vos séduires !
                        </Typo>
                    </div>

                    <div className="pb-5 pr-10 flex justify-end">
                        <Button
                            icon={{ icon: FaArrowRight }}
                            size="large"
                            baseUrl="/collect"
                        >
                            Click & Collect
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};
