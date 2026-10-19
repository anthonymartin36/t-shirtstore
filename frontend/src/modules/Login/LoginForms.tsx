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
    
    const setFieldError = (field: keyof FormErrors, message: string) =>
            setErrors(prev => ({ ...prev, [field]: message }))
    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const validatePassword = (value: string) => /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)


    const hasErrors = () => Object.values(errors).some(e => e !== '')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        if (hasErrors()) return
        try {
            await loginCustomerApi(email, password)
            navigate('/')
        } catch (error) {
            setFieldError('email', 'Invalid email or password.')
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSignIn}>
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
                
                <a href="/forgotpassword" className="flex justify-end text-sm leading-6 font-semibold text-red-600 hover:text-red-500">
                    Forgot Password</a>
                <Button handleClick={() => {}} type="submit" text="Sign In" />
            </form>
        </div>
    )
}

export default LoginForms
