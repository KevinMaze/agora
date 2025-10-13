import { Container } from "@/ui/components/container";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Coffee from "@/../public/assets/images/coffee.jpg";
import Stairway from "@/../public/assets/images/stairway.jpg";

export const PresentationView = () => {
    return (
        <Container className="mb-10">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mt-15 mb-20 uppercase underline tracking-widest"
            >
                Présentation Rapide
            </Typo>
            <div className="">
                <Typo variant="para" components="p" weight="normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam eget sapien quis diam scelerisque aliquam. Phasellus
                    rhoncus tellus at dapibus volutpat. Mauris sit amet velit
                    vitae metus luctus convallis. Quisque sed vulputate mi, a
                    gravida turpis. Maecenas non libero vel neque semper
                    ullamcorper et porta dui. Suspendisse ut sagittis velit.
                    Etiam eu lobortis lectus. Mauris a tortor malesuada,
                    accumsan enim sollicitudin, vestibulum ipsum. Mauris aliquam
                    pretium metus eu cursus. Curabitur nibh quam, dignissim ac
                    justo ut, egestas elementum arcu.
                </Typo>
                <Image
                    src={Coffee}
                    alt="Coffee"
                    className="w-lg shadow-[var(--myshadow)] rounded-bl-3xl"
                />
                <Image src={Stairway} alt="Stairway" className="w-lg" />
            </div>
            <div>
                <Button>Coffee Shop</Button>
                <Button>Librairie</Button>
            </div>
        </Container>
    );
};
