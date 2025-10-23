import { Header } from "./component/header.view";
import { Moment } from "./component/moment.view";
import { Recipe } from "./component/recipe.view";

export const CoffeeShopView = () => {
    return (
        <>
            <Header />
            <Moment />
            <Recipe />
        </>
    );
};
