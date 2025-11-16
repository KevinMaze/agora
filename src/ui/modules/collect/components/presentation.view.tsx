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
                className="mt-3 uppercase text-4xl underline"
            >
                Présentation
            </Typo>
            <div className="relative flex justify-center">
                <div className="absolute w-[500px] h-[600px] right-150 top-50">
                    <Image
                        src={BookBox}
                        alt="Image de la box"
                        className="border-1 border-primary rounded-3xl"
                    />
                </div>
                <div className="absolute z-1 bg-foreground/80 p-5 rounded-3xl w-[800px] h-[300px] left-90">
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="mt-10"
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
