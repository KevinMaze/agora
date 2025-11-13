import { BookBox } from "./components/book-box.view";
import { ExplainsView } from "./components/explain.view";
import { LibrairieView } from "./librairie.view";

export const LibrairieContainer = () => {
    return (
        <>
            <LibrairieView />
            <ExplainsView />
            <BookBox />
        </>
    );
};
