import { Header } from "./component/header.view";
import { Moment } from "./component/moment.view";
import { Recipe } from "./component/recipe.view";

export const CoffeeShopView = () => {
    return (
        <>
            <Header />
            <Moment />
            {/* Le filtre est maintenant géré à l'intérieur du composant Recipe. On peut lui passer un filtre initial. */}
            <Recipe />
        </>
    );
};
