import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerCustomerApi } from '../../apis/login';
import { useNavigate } from 'react-router-dom'
import type { FormErrors } from './type'

const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', password: '', password_confirmation: '', server: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const setFieldError = (field: keyof FormErrors, message: string) =>
        setErrors(prev => ({ ...prev, [field]: message }))

    const validateName = (value: string) => value.trim() !== ''
    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const validatePassword = (value: string) => /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const nameValid = validateName(name)
        const emailValid = validateEmail(email)
        const passwordValid = validatePassword(password)
        const confirmValid = password === password_confirmation

        if (!nameValid) setFieldError('name', 'Name cannot be empty.')
        if (!emailValid) setFieldError('email', 'Please enter a valid email address.')
        if (!passwordValid) setFieldError('password', 'Password must be 8+ characters, contain a capital letter, a symbol, and no spaces.')
        if (!confirmValid) setFieldError('password_confirmation', 'Passwords do not match!')
        if (!nameValid || !emailValid || !passwordValid || !confirmValid) return

        setIsSubmitting(true)
        try {
            await registerCustomerApi(name, email, password, password_confirmation)
            navigate('/confirm-email')
        } catch (error: any) {
            const message = error?.response?.body?.errors?.[0] ?? 'Registration failed. Please try again.'
            setFieldError('server', message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            {errors.server && <div className="bg-red-600 text-white text-sm font-bold text-center rounded-md p-2 mb-2">{errors.server}</div>}
            <form className="flex flex-col gap-4 mt-5" onSubmit={handleRegister}>
                <Input
                    onBlur={() => {
                        validateName(name) ? setFieldError('name', '') : setFieldError('name', 'Name cannot be empty.')
                    }}
                    onChange={(e) => { setName(e.target.value); setFieldError('name', ''); setFieldError('server', '') }}
                    value={name}
                    error={errors.name}
                    label="Name"
                    name="name" />
                {errors.name && <div className="text-red-600 text-sm font-bold text-center">{errors.name}</div>}

                <Input
                    onBlur={() => {
                        validateEmail(email) ? setFieldError('email', '') : setFieldError('email', 'Please enter a valid email address.')
                    }}
                    onChange={(e) => { setEmail(e.target.value); setFieldError('email', ''); setFieldError('server', '') }}
                    value={email}
                    error={errors.email}
                    label={<>Email <span className="text-gray-400 text-xs font-normal">(***@example.com)</span></>}
                    name="email" />
                {errors.email && <div className="text-red-600 text-sm font-bold text-center">{errors.email}</div>}

                <Input
                    onBlur={() => {
                        validatePassword(password) ? setFieldError('password', '') : setFieldError('password', 'Password must be 8+ characters, contain a capital letter, a symbol, and no spaces.')
                    }}
                    onChange={(e) => { setPassword(e.target.value); setFieldError('password', ''); setFieldError('server', '') }}
                    value={password}
                    error={errors.password}
                    label="Password"
                    name="password" />
                {errors.password && <div className="text-red-600 text-sm font-bold text-center">{errors.password}</div>}

                <Input
                    onBlur={() => {
                        password !== password_confirmation ? setFieldError('password_confirmation', 'Passwords do not match!') : setFieldError('password_confirmation', '')
                    }}
                    onChange={(e) => { setPasswordConfirmation(e.target.value); setFieldError('password_confirmation', '') }}
                    value={password_confirmation}
                    error={errors.password_confirmation}
                    label={<>Password Confirmation <span className="text-gray-400 text-xs font-normal">(please ensure they match)</span></>}
                    name="password_confirmation" />
                {errors.password_confirmation && <div className="text-red-600 text-sm font-bold text-center">{errors.password_confirmation}</div>}

                <Button handleClick={() => {}} type="submit" text={isSubmitting ? 'Registering...' : 'Register'} disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default RegisterForm
