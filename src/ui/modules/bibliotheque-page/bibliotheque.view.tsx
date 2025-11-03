import { CatalogueView } from "./components/catalogue.view";
import { Header } from "./components/header.view";
import { Like } from "./components/like.view";
import { News } from "./components/news.view";

export const BibliothequeView = () => {
    return (
        <>
            <Header />
            <News />
            <Like />
            <CatalogueView />
        </>
    );
};
