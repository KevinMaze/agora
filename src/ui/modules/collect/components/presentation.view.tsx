import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import BookBox from "@/../public/assets/images/book_box.jpg";

export const PresentationCollect = () => {
    return (
        <Container className="mt-25 mb-200">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mt-3 uppercase text-2xl sm:text-4xl lg:text-6xl underline text-center sm:text-start"
            >
                Présentation
            </Typo>
            <div className="lg:relative sm:flex lg:justify-center sm:flex-col lg:items-center">
                <div className="lg:absolute lg:w-[500px] lg:h-[400px] lg:right-150 lg:top-60 mb-5">
                    <Image
                        src={BookBox}
                        alt="Image de la box"
                        className="border-1 border-primary rounded-3xl"
                        objectFit="cover"
                    />
                </div>
                <div className="lg:absolute z-1 bg-foreground/80 p-5 rounded-3xl lg:top-10 lg:w-[800px] lg:h-[300px] lg:left-90 text-center">
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-center mt-5 sm:text-xl"
                        color="other"
                    >
                        Quod opera consulta cogitabatur astute, ut hoc
                        insidiarum genere Galli periret avunculus, ne eum ut
                        praepotens acueret in fiduciam exitiosa coeptantem.
                        verum navata est opera diligens hocque dilato Eusebius
                        praepositus cubiculi missus est Cabillona aurum secum
                        perferens, quo per turbulentos seditionum concitores
                        occultius distributo et tumor consenuit militum et salus
                        est in tuto locata praefecti. deinde cibo abunde perlato
                        castra die praedicto sunt mota.
                    </Typo>
                </div>
            </div>
        </Container>
    );
};
