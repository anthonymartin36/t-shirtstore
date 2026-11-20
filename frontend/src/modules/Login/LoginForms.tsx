import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { loginCustomerApi } from '../../apis/login'
import type { FormErrors } from './type'

const LoginForms: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', password: '', password_confirmation: '', server: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const setFieldError = (field: keyof FormErrors, message: string) =>
        setErrors(prev => ({ ...prev, [field]: message }))

    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const validatePassword = (value: string) => /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()

        const emailValid = validateEmail(email)
        const passwordValid = validatePassword(password)
        if (!emailValid) setFieldError('email', 'Please enter a valid email address.')
        if (!passwordValid) setFieldError('password', 'Password must be 8+ characters, contain a capital letter, a symbol, and no spaces.')
        if (!emailValid || !passwordValid) return

        setIsSubmitting(true)
        try {
            await loginCustomerApi(email, password)
            navigate('/')
        } catch {
            setFieldError('server', 'Invalid email or password.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            {errors.server && <div className="bg-red-600 text-white text-sm font-bold text-center rounded-md p-2 mb-2">{errors.server}</div>}
            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSignIn}>
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

                <a href="/ForgotPassword" className="flex justify-end text-sm leading-6 font-semibold text-red-600 hover:text-red-500">
                    Forgot Password</a>
                <Button handleClick={() => {}} type="submit" text={isSubmitting ? 'Signing in...' : 'Sign In'} disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default LoginForms
