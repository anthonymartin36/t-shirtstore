import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { resetCustomerPasswordApi } from '../../apis/login'
import type { ResetFormErrors } from './type'

const ForgotPasswordForm: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<ResetFormErrors>({ email: '' })
    
    const setFieldError = (field: keyof ResetFormErrors, message: string) =>
            setErrors(prev => ({ ...prev, [field]: message }))
    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)



    const hasErrors = () => Object.values(errors).some(e => e !== '')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        if (hasErrors()) return
        try {
            await resetCustomerPasswordApi(email)
            navigate('/')
        } catch {
            setFieldError('email', 'Something went wrong. Please try again.')
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
                
                
                <Button type="submit" text="Send Reset Email" handleClick={() => {}} />
            </form>
        </div>
    )
}

export default ForgotPasswordForm
