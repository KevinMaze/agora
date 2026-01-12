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
    Name: string;
    description: string;
    adress: string;
    phoneNumber: string;
    hobbies: string;
    styleLove: string;
}

export interface AddBookFormFieldsType {
    name: string;
    description: string;
    category: string;
    releaseYear: string;
    autor: string;
}
