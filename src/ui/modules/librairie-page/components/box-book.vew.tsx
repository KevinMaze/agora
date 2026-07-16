import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { Spinner } from "@/ui/design-system/spinner";
import { Modal } from "@/ui/design-system/modal";
import { ModalAvis } from "@/ui/design-system/modal-avis";
import Image from "next/image";
import DefaultImage from "@/../public/assets/images/404.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { getBookBoxItems } from "@/api/book-box";
import { firestoreUpdateDocument } from "@/api/firestore";
import { BookBoxItemDocument } from "@/types/book-box-item";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/router";

type BookBoxItem = BookBoxItemDocument & { id: string };

export const BoxBookView = () => {
    const { authUser } = useAuth();
    const router = useRouter();

    const [allBooks, setAllBooks] = useState<BookBoxItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<BookBoxItem | null>(null);
    const [isReserving, setIsReserving] = useState(false);
    const [releasedBook, setReleasedBook] = useState<BookBoxItem | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    useEffect(() => {
        getBookBoxItems()
            .then((data) =>
                setAllBooks(data.filter((b) => !!b.id) as BookBoxItem[]),
            )
            .catch(() =>
                toast.error("Impossible de charger les livres de la boîte."),
            )
            .finally(() => setIsLoading(false));
    }, []);

    const availableBooks = allBooks.filter((b) => b.status === "available");
    const reservedBooks = allBooks.filter((b) => b.status === "reserved");

    const isAdmin = authUser?.userDocument?.role === "admin";

    const canRelease = (book: BookBoxItem) =>
        isAdmin || (!!authUser && book.reservedBy?.userId === authUser.uid);

    const handleBookClick = (book: BookBoxItem) => setSelectedBook(book);
    const handleCloseModal = () => setSelectedBook(null);

    const handleReserve = async (bookId: string) => {
        if (!authUser) {
            router.push("/connexion/inscription");
            return;
        }

        setIsReserving(true);

        const reservedBy = {
            userId: authUser.uid,
            displayName:
                authUser.userDocument?.displayName ||
                authUser.displayName ||
                "Membre",
        };

        const { error } = await firestoreUpdateDocument("bookBox", bookId, {
            status: "reserved",
            reservedBy,
        });

        if (error) {
            toast.error("Erreur lors de la réservation. Réessaie.");
            setIsReserving(false);
            return;
        }

        setAllBooks((prev) =>
            prev.map((b) =>
                b.id === bookId
                    ? { ...b, status: "reserved" as const, reservedBy }
                    : b,
            ),
        );
        setIsReserving(false);
        handleCloseModal();
        toast.success("Livre réservé ! Passe le récupérer à la librairie.");
    };

    const handleRelease = async (bookId: string) => {
        const { error } = await firestoreUpdateDocument("bookBox", bookId, {
            status: "available",
            reservedBy: null,
        });

        if (error) {
            toast.error("Erreur lors de la remise à disposition.");
            return;
        }

        const releasedItem =
            allBooks.find((b) => b.id === bookId) || null;

        setAllBooks((prev) =>
            prev.map((b) =>
                b.id === bookId
                    ? { ...b, status: "available" as const, reservedBy: null }
                    : b,
            ),
        );
        toast.success("Livre remis à disposition.");
        setReleasedBook(releasedItem);
    };

    const closeReleaseReviewPrompt = () => {
        setReleasedBook(null);
        setIsReviewModalOpen(false);
    };

    return (
        <Container className="py-20 relative min-h-[600px]">
            <Typo
                variant="title"
                component="h2"
                weight="bold"
                color="primary"
                className="mb-10 text-center uppercase tracking-wider underline underline-offset-8 text-4xl"
            >
                La Boîte à Livres
            </Typo>

            <div className="flex flex-col items-center">
                <Typo
                    variant="para"
                    color="other"
                    className="mb-8 text-center max-w-2xl"
                >
                    Découvrez les trésors laissés par la communauté. Cliquez sur
                    un livre pour voir les détails et le réserver. Premier
                    arrivé, premier servi !
                </Typo>

                {/* Conteneur "Boîte" */}
                <div className="relative w-full max-w-5xl mx-auto bg-foreground border-2 border-primary p-8 sm:p-12 min-h-[400px] my-shadow">
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner size="large" />
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-8 justify-center items-end">
                            <AnimatePresence mode="popLayout">
                                {availableBooks.map((book) => (
                                    <motion.div
                                        key={book.id}
                                        layoutId={`book-card-${book.id}`}
                                        onClick={() => handleBookClick(book)}
                                        className="cursor-pointer relative group w-32 sm:w-40 aspect-[2/3] shadow-md hover:shadow-xl transition-shadow duration-300"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 20,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.5,
                                            filter: "blur(10px)",
                                        }}
                                        whileHover={{ y: -10, scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                        }}
                                    >
                                        <Image
                                            src={book.image || DefaultImage}
                                            alt={book.title}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full font-medium bg-[var(--color-tier)]/20 text-[var(--color-tier)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                            Disponible
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {!isLoading && availableBooks.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                            <Typo
                                variant="title"
                                component="h3"
                                color="primary"
                                className="text-xl mb-2"
                            >
                                La boîte est vide
                            </Typo>
                            <Typo variant="para" color="other">
                                Revenez plus tard pour de nouvelles pépites !
                            </Typo>
                        </div>
                    )}
                </div>

                {/* Livres réservés */}
                {!isLoading && reservedBooks.length > 0 && (
                    <div className="mt-16 p-8 border-2 border-dashed border-primary/40 rounded-2xl w-full max-w-5xl mx-auto">
                        <Typo
                            variant="title"
                            component="h3"
                            color="primary"
                            className="text-center mb-6 uppercase underline underline-offset-4"
                        >
                            Livres actuellement réservés
                        </Typo>
                        <ul className="space-y-4">
                            {reservedBooks.map((book) => (
                                <li
                                    key={book.id}
                                    className="flex items-center gap-4 bg-foreground/40 border border-primary/20 p-4 rounded-lg"
                                >
                                    <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                                        <Image
                                            src={book.image || DefaultImage}
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Typo
                                            variant="para"
                                            weight="bold"
                                            className="truncate"
                                        >
                                            {book.title}
                                        </Typo>
                                        <Typo
                                            variant="para"
                                            color="other"
                                            className="text-sm"
                                        >
                                            {book.author}
                                        </Typo>
                                        <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-[var(--color-danger)]/20 text-[var(--color-danger)]">
                                            Indisponible
                                        </span>
                                        {book.reservedBy && (
                                            <Typo
                                                variant="para"
                                                color="secondary"
                                                className="text-xs mt-1"
                                            >
                                                Réservé par{" "}
                                                {book.reservedBy.displayName}
                                            </Typo>
                                        )}
                                    </div>
                                    {canRelease(book) && (
                                        <Button
                                            type="button"
                                            size="small"
                                            action={() =>
                                                handleRelease(book.id)
                                            }
                                        >
                                            Remettre à disposition
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`book-card-${selectedBook.id}`}
                            className="relative bg-background border-2 border-primary/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-foreground/80 hover:bg-foreground rounded-full transition-colors"
                            >
                                <FaXmark size={20} className="text-primary" />
                            </button>

                            <div className="relative w-full sm:w-2/5 h-64 sm:h-auto">
                                <Image
                                    src={selectedBook.image || DefaultImage}
                                    alt={selectedBook.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Typo
                                            variant="title"
                                            component="h3"
                                            weight="bold"
                                            color="primary"
                                            className="text-2xl sm:text-3xl mb-1 uppercase"
                                        >
                                            {selectedBook.title}
                                        </Typo>
                                        <Typo
                                            variant="para"
                                            color="secondary"
                                            className="text-lg italic mb-6"
                                        >
                                            {selectedBook.author}
                                        </Typo>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Typo
                                            variant="para"
                                            color="other"
                                            className="leading-relaxed mb-8"
                                        >
                                            {selectedBook.description}
                                        </Typo>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Button
                                        size="large"
                                        isLoading={isReserving}
                                        action={() =>
                                            handleReserve(selectedBook.id)
                                        }
                                    >
                                        {authUser
                                            ? "Réserver ce livre"
                                            : "S'enregistrer pour réserver"}
                                    </Button>
                                    <Typo
                                        variant="para"
                                        color="other"
                                        className="text-xs text-center mt-3"
                                    >
                                        {authUser
                                            ? "* En réservant, le livre sera retiré de la boîte pour vous."
                                            : "* Tu dois être inscrit pour réserver un livre."}
                                    </Typo>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Modal
                isOpen={!!releasedBook && !isReviewModalOpen}
                onClose={closeReleaseReviewPrompt}
                title="Laisser un avis ?"
                contentClassName="!h-auto"
            >
                {releasedBook && (
                    <div className="space-y-5 text-center">
                        <Typo variant="para" component="p">
                            Veux-tu laisser un avis sur «{" "}
                            {releasedBook.title} » ?
                        </Typo>
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                action={() => setIsReviewModalOpen(true)}
                            >
                                Oui, laisser un avis
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                action={closeReleaseReviewPrompt}
                            >
                                Non merci
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <ModalAvis
                isOpen={isReviewModalOpen}
                onClose={closeReleaseReviewPrompt}
                bookId={releasedBook?.id}
                bookTitle={releasedBook?.title}
                bookImage={releasedBook?.image}
            />
        </Container>
    );
};
