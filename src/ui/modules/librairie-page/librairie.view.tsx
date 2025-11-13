import { ExplainsView } from "./components/explain.view";
import { HeaderLibrairie } from "./components/header-librairie.view";
import { LikeBookBoxView } from "./components/like-bookbox.view";

export const LibrairieView = () => {
    return (
        <>
            <HeaderLibrairie />
            <ExplainsView />
            <LikeBookBoxView />
        </>
    );
};
