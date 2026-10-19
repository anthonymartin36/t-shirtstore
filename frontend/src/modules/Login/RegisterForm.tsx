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

    const setFieldError = (field: keyof FormErrors, message: string) =>
        setErrors(prev => ({ ...prev, [field]: message }))

    const validateName = (value: string) => value.trim() !== ''

    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const validatePassword = (value: string) => /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)

    const hasErrors = () => Object.values(errors).some(e => e !== '')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (hasErrors()) return

        try {
            const response = await registerCustomerApi(name, email, password, password_confirmation)
            console.log('Registration successful:', response)
            navigate('/')
        } catch (error: any) {
            const message = error?.response?.body?.errors?.[0] ?? 'Registration failed. Please try again.'
            setFieldError('server', message)
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={errors.name}
                    label="Name"
                    name="name" />
                {errors.name && <div className="text-red-600 text-sm font-bold text-center">{errors.name}</div>}
                <Input
                    onBlur={() => {
                        validateEmail(email) ? setFieldError('email', '') : setFieldError('email', 'Please enter a valid email address.')
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={errors.email}
                    label={<>Email <span className="text-gray-400 text-xs font-normal">(***@example.com)</span></>}
                    name="email" />
                {errors.email && <div className="text-red-600 text-sm font-bold text-center">{errors.email}</div>}
                <Input
                    onBlur={() => {
                        validatePassword(password) ? setFieldError('password', '') : setFieldError('password', 'Password must be 8+ characters, contain a capital letter, a symbol, and no spaces.')
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={errors.password}
                    label="Password"
                    name="password" />
                {errors.password && <div className="text-red-600 text-sm font-bold text-center">{errors.password}</div>}
                <Input
                    onBlur={() => {
                        password !== password_confirmation ? setFieldError('password_confirmation', 'Passwords do not match!') : setFieldError('password_confirmation', '')
                    }}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={password_confirmation}
                    error={errors.password_confirmation}
                    label={<>Password Confirmation  <span className="text-gray-400 text-xs font-normal">(please ensure they match)</span></>}
                    name="password" />
                {errors.password_confirmation && <div className="text-red-600 text-sm font-bold text-center">{errors.password_confirmation}</div>}
                <Button handleClick={() => {}} type="submit" text="Register" />
            </form>
        </div>
    )
}

export default RegisterForm
