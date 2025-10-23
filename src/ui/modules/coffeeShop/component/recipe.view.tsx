import { Container } from "@/ui/components/container";
import { CardRecipe } from "./card-coffee.view";
import Coffee from "@/../public/assets/images/coffee.png";
import Cake from "@/../public/assets/images/cake.jpg";

export const Recipe = () => {
    return (
        <Container className="mb-80">
            <CardRecipe alt="" />
        </Container>
    );
};
