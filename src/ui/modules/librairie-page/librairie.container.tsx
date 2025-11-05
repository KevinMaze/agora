import { ExplainsView } from "./components/explain.view";
import { LikeBookBoxView } from "./components/like-bookbox.view";
import { LibrairieView } from "./librairie.view";

export const LibrairieContainer = () => {
    return (
        <>
            <LibrairieView />
            <ExplainsView />
            <LikeBookBoxView />
        </>
    );
};
