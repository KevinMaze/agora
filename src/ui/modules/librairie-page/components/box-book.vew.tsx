import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import Dune from "@/../public/assets/images/dune.jpg"; // Image de placeholder

// Interface pour les livres
interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: StaticImageData;
}

// Données fictives (à remplacer par un appel API/Base de données)
const INITIAL_BOOKS: Book[] = [
    {
        id: 1,
        title: "Dune",
        author: "Frank Herbert",
        description:
            "Dans un futur lointain, le duc Leto Atréides reçoit la charge de la planète Arrakis, unique source de l'Épice, la substance la plus précieuse de l'univers.",
        image: Dune,
    },
    {
        id: 2,
        title: "Le Messie de Dune",
        author: "Frank Herbert",
        description:
            "Douze ans ont passé depuis que Paul Muad'Dib a vaincu les Harkonnen et l'Empereur Shaddam IV. Il est désormais l'Empereur de l'univers connu.",
        image: Dune,
    },
    {
        id: 3,
        title: "Les Enfants de Dune",
        author: "Frank Herbert",
        description:
            "Sur Arrakis, la planète des sables, neuf ans se sont écoulés depuis que Paul Muad'Dib a disparu dans le désert.",
        image: Dune,
    },
    {
        id: 4,
        title: "L'Empereur-Dieu de Dune",
        author: "Frank Herbert",
        description:
            "Plus de trois mille ans ont passé. Leto II, le fils de Paul Muad'Dib, est devenu l'Empereur-Dieu.",
        image: Dune,
    },
];

export const BoxBookView = () => {
    // État pour les livres dans la boîte
    // Note: Pour le temps réel, cet état devrait être synchronisé avec votre backend (ex: Firestore onSnapshot, Supabase subscription)
    const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);

    // État pour les livres retirés/réservés (simulation panneau admin)
    const [reservedBooks, setReservedBooks] = useState<Book[]>([]);

    // État pour le livre sélectionné (popup)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleReserve = (bookId: number) => {
        const bookToReserve = books.find((b) => b.id === bookId);
        if (!bookToReserve) return;

        // Logique Backend ici :
        // await api.reserveBook(bookId, userId);

        // Mise à jour optimiste de l'interface
        setBooks((prev) => prev.filter((b) => b.id !== bookToReserve.id));
        setReservedBooks((prev) => [...prev, bookToReserve]);
        handleCloseModal();

        // Feedback utilisateur (Toast, notification...)
        console.log(`Livre ${bookId} réservé et retiré de la boîte.`);
    };

    const handleReturn = (bookToReturn: Book) => {
        // Logique Backend ici :
        // await api.returnBook(bookToReturn.id);

        // Mise à jour de l'interface
        setReservedBooks((prev) =>
            prev.filter((b) => b.id !== bookToReturn.id)
        );
        setBooks((prev) => [...prev, bookToReturn].sort((a, b) => a.id - b.id)); // On trie pour garder un ordre stable

        console.log(`Livre ${bookToReturn.id} remis dans la boîte.`);
    };

    return (
        <Container className="py-20 relative min-h-[600px]">
            <Typo
                variant="title"
                component="h2"
                weight="bold"
                className="mb-10 text-center uppercase tracking-wider underline underline-offset-8 decoration-primary"
            >
                La Boîte à Livres
            </Typo>

            <div className="flex flex-col items-center">
                <Typo
                    variant="para"
                    color="secondary"
                    className="mb-8 text-center max-w-2xl"
                >
                    Découvrez les trésors laissés par la communauté. Cliquez sur
                    un livre pour voir les détails et le réserver. Premier
                    arrivé, premier servi !
                </Typo>

                {/* Conteneur "Boîte" */}
                <div className="relative w-full max-w-5xl mx-auto bg-amber-50/50 border-2 border-primary/30 rounded-3xl p-8 sm:p-12 min-h-[400px] shadow-inner">
                    {/* Grille de livres */}
                    <div className="flex flex-wrap gap-8 justify-center items-end">
                        <AnimatePresence mode="popLayout">
                            {books.map((book) => (
                                <motion.div
                                    key={book.id}
                                    layoutId={`book-card-${book.id}`}
                                    onClick={() => handleBookClick(book)}
                                    className="cursor-pointer relative group w-32 sm:w-40 aspect-[2/3] shadow-md hover:shadow-xl transition-shadow duration-300"
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
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
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    {/* Overlay au survol */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Message si vide */}
                    {books.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                            <Typo
                                variant="title"
                                component="h3"
                                className="text-xl mb-2"
                            >
                                La boîte est vide
                            </Typo>
                            <Typo variant="para">
                                Revenez plus tard pour de nouvelles pépites !
                            </Typo>
                        </div>
                    )}
                </div>

                {/* Section pour gérer les livres retirés (simulation panneau de contrôle) */}
                <div className="mt-20 p-8 border-2 border-dashed border-gray-400 rounded-2xl w-full max-w-5xl mx-auto">
                    <Typo
                        variant="title"
                        component="h3"
                        className="text-center mb-6"
                    >
                        Livres Actuellement Réservés (Panneau de Contrôle)
                    </Typo>
                    {reservedBooks.length > 0 ? (
                        <ul className="space-y-4">
                            {reservedBooks.map((book) => (
                                <li
                                    key={`reserved-${book.id}`}
                                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                                >
                                    <div>
                                        <Typo weight="bold">{book.title}</Typo>
                                        <Typo
                                            color="secondary"
                                            className="text-xl"
                                        >
                                            {book.author}
                                        </Typo>
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="small"
                                        action={() => handleReturn(book)}
                                    >
                                        Remettre à disposition
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typo color="secondary" className="text-center">
                            Aucun livre n'est actuellement réservé.
                        </Typo>
                    )}
                </div>
            </div>

            {/* Modal / Popup */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Card */}
                        <motion.div
                            layoutId={`book-card-${selectedBook.id}`}
                            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
                        >
                            {/* Bouton fermer */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
                            >
                                <FaXmark size={20} className="text-primary" />
                            </button>

                            {/* Image */}
                            <div className="relative w-full sm:w-2/5 h-64 sm:h-auto">
                                <Image
                                    src={selectedBook.image}
                                    alt={selectedBook.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Contenu */}
                            <div className="flex-1 p-8 flex flex-col justify-between bg-white">
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
                                            className="text-2xl sm:text-3xl mb-1 text-primary"
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
                                            className="text-gray-600 leading-relaxed mb-8"
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
                                        action={() =>
                                            handleReserve(selectedBook.id)
                                        }
                                        // className="w-full justify-center"
                                    >
                                        Réserver ce livre
                                    </Button>
                                    <Typo
                                        variant="para"
                                        color="secondary"
                                        className="text-xs text-center mt-3"
                                    >
                                        * En réservant, le livre sera retiré de
                                        la boîte pour vous.
                                    </Typo>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Container>
    );
};
