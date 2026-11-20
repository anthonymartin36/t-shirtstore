import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { updateCustomerPasswordApi } from '../../apis/login'

const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState({ password: '', password_confirmation: '', server: '' })

  const setFieldError = (field: keyof typeof errors, message: string) =>
    setErrors(prev => ({ ...prev, [field]: message }))

  const validatePassword = (value: string) =>
    /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)

  const hasErrors = () => Object.values(errors).some(e => e !== '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hasErrors()) return
    if (!token) {
      setFieldError('server', 'Invalid or missing reset token.')
      return
    }
    try {
      await updateCustomerPasswordApi(token, password, passwordConfirmation)
      navigate('/Login')
    } catch {
      setFieldError('server', 'Password reset failed. The link may have expired.')
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Choose a new password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {errors.server && (
            <div className="rounded-md bg-red-50 border border-red-300 p-3 text-red-600 text-sm font-bold text-center">
              {errors.server}
            </div>
          )}

          <Input
            name="password"
            label="New password"
            value={password}
            error={errors.password}
            onBlur={() =>
              validatePassword(password)
                ? setFieldError('password', '')
                : setFieldError('password', 'Min 8 chars, one capital letter, one symbol, no spaces.')
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="text-red-600 text-sm font-bold text-center">{errors.password}</div>
          )}

          <Input
            name="password_confirmation"
            label="Confirm new password"
            value={passwordConfirmation}
            error={errors.password_confirmation}
            onBlur={() =>
              passwordConfirmation === password
                ? setFieldError('password_confirmation', '')
                : setFieldError('password_confirmation', 'Passwords do not match.')
            }
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password_confirmation && (
            <div className="text-red-600 text-sm font-bold text-center">{errors.password_confirmation}</div>
          )}

          <Button type="submit" text="Set new password" handleClick={() => {}} />
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
