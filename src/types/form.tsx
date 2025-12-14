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
    username: string;
}
export interface LoginFormFieldsType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface ForgetFormFieldsType {
    username: string;
    email: string;
}
