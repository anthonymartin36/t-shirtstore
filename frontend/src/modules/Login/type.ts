type FormErrors = {
    name: string
    email: string
    password: string
    password_confirmation: string
    server: string
}

type ResetFormErrors = Pick<FormErrors, 'email'>

export type { FormErrors, ResetFormErrors }

