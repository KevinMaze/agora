export interface RecipeInterface {
    uid: string;
    title: string;
    type: string;
    image: string | null;
    recipeDocument?: RecipeDocument;
}

export interface RecipeDocument {
    uid: string;
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string[];
    allergènes: string[];
    price: string;
    image: string | null;
}
