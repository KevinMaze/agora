import { Container } from "@/ui/components/container";
import Image from "next/image";
import BookB from "@/../public/assets/images/book_box.jpg";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { FaArrowRight } from "react-icons/fa";

export const BookBox = () => {
    return (
        <Container className="mt-80 mb-50">
            <div className="relative h-150 w-full overflow-hidden rounded-3xl border-primary border-1">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src={BookB}
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
                        className="mt-3 uppercase underline pl-10 justify-start text-5xl"
                    >
                        La Book Box
                    </Typo>

                    <div className="text-center justify-center pr-20 pl-20">
                        <Typo
                            variant="para"
                            components="p"
                            weight="normal"
                            color="other"
                            className="text-center justify-center pr-20 pl-20"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam eget sapien quis diam scelerisque
                            aliquam. Phasellus rhoncus tellus at dapibus
                            volutpat. Mauris sit amet velit vitae metus luctus
                            convallis. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Aliquam eget sapien quis diam
                            scelerisque aliquam. Phasellus rhoncus tellus at
                            dapibus volutpat. Mauris sit amet velit vitae metus
                            luctus convallis.
                        </Typo>
                    </div>

                    <div className="mb-5 pr-10 flex justify-end">
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
