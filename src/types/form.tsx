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
    category: string;
    releaseYear: string;
    autor: string;
    image: FileList;
}
