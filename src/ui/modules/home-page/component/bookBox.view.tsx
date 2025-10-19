import { Container } from "@/ui/components/container";
import Image from "next/image";
import BookB from "@/../public/assets/images/book_box.jpg";

export const BookBox = () => {
    return (
        <Container className="mt-80 mb-80">
            <div className="relative h-150 w-full overflow-hidden rounded-3xl">
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

                <div></div>
            </div>
        </Container>
    );
};
