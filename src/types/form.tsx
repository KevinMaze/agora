export interface FormsType {
    onSubmit: any;
    control?: any;
    errors: any;
    isLoading: boolean;
    register: any;
    handleSubmit: any;
    watch: any;
}

export interface RegisterFormFieldsType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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
