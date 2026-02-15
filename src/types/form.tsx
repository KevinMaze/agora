export interface FormsType {
    onSubmit: any;
    control?: any;
    errors: any;
    isLoading: boolean;
    register: any;
    handleSubmit: any;
}

export interface RegisterFormFieldsType {
    email: string;
    password: string;
    displayName: string;
}
export interface LoginFormFieldsType {
    email: string;
    password: string;
}
export interface ForgetFormFieldsType {
    username: string;
    email: string;
}

export interface OnboardingProfileFormFieldsType {
    name: string;
    displayName: string;
    pseudo: string;
    description: string;
    adress: string;
    hobbies: string;
    styleLove: string;
}

export interface AddBookFormFieldsType {
    title: string;
    description: string;
    category: string | string[];
    releaseYear: string;
    autor: string;
    image: FileList;
}

export interface AddBoxFormFieldsType {
    title: string;
    description: string;
    type: string;
    price: string;
    image: FileList;
}

export interface AddEvenementFormFieldsType {
    title: string;
    date: string;
    description: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    image: FileList;
}

export interface AddRecipeFormFieldsType {
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string[];
    allergènes: string[];
    price: string;
    image: FileList;
}

export interface AddMomentFormFieldsType {
    title: string;
    type: string;
    categorie: string;
    temperature: string;
    description: string;
    ingredients: string[];
    allergènes: string[];
    price: string;
    image: FileList;
}
