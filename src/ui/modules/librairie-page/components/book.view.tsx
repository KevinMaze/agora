import { motion, PanInfo } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface BookProps {
    id: number;
    title?: string;
    src?: StaticImageData;
    alt?: string;
    onSelect: (id: number, element: HTMLDivElement) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elementRef: React.RefObject<any>;
}

export const Book = ({
    id,
    title,
    src,
    alt,
    onSelect,
    elementRef,
}: BookProps) => {
    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        // Si le déplacement est très faible, on considère que c'est un clic
        if (
            Math.abs(info.offset.x) < 5 &&
            Math.abs(info.offset.y) < 5 &&
            elementRef.current
        ) {
            onSelect(id, elementRef.current);
        }
    };

    return (
        <motion.div
            ref={elementRef}
            layoutId={`book-container-${id}`}
            drag
            dragConstraints={{
                top: -150,
                left: -400,
                right: 400,
                bottom: 150,
            }}
            dragMomentum={false}
            className="relative w-40 h-60 shadow-lg cursor-grab active:cursor-grabbing rounded-lg overflow-hidden"
            onDragEnd={handleDragEnd}
            title={title}
        >
            <Image src={src} alt={alt} layout="fill" objectFit="cover" />
        </motion.div>
    );
};
