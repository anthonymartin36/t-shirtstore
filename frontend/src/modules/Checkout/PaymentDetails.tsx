import React, { useState } from 'react'
import { PaymentData } from '../../pages/ProductCategory/types'

interface Props {
    data: PaymentData
    onChange: (data: PaymentData) => void
}

const inputBase = "border rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 bg-[var(--surface-color)]"
const inputValid = `${inputBase} border-gray-300 focus:ring-blue-500`
const inputError = `${inputBase} border-red-500 focus:ring-red-500`
const selectBase = "border border-gray-300 rounded-md p-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--surface-color)]"

const currentYear = new Date().getFullYear()
const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const years = Array.from({ length: 12 }, (_, i) => currentYear + i)

const PaymentDetails: React.FC<Props> = ({ data, onChange }) => {
    const [errors, setErrors] = useState<Partial<Record<keyof PaymentData, string>>>({})

    const setError = (field: keyof PaymentData, msg: string | undefined) =>
        setErrors(prev => ({ ...prev, [field]: msg }))

    const handleCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s'\-]/g, '')
        onChange({ ...data, cardName: value })
        const words = value.trim().split(/\s+/).filter(Boolean)
        setError('cardName', words.length < 2 ? 'Enter first and last name' : undefined)
    }

    const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
        const formatted = digits.match(/.{1,4}/g)?.join('-') ?? digits
        onChange({ ...data, cardNumber: formatted })
        setError('cardNumber', digits.length > 0 && digits.length < 16 ? 'Card number must be 16 digits' : undefined)
    }

    const expiryParts = data.expiryDate ? data.expiryDate.split('/') : ['', '']
    const expiryMonth = expiryParts[0] ?? ''
    const expiryYear = expiryParts[1] ?? ''

    const handleExpiryMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange({ ...data, expiryDate: `${e.target.value}/${expiryYear}` })

    const handleExpiryYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange({ ...data, expiryDate: `${expiryMonth}/${e.target.value}` })

    const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3)
        onChange({ ...data, cvv: value })
        setError('cvv', value.length > 0 && value.length < 3 ? 'CVV must be 3 digits' : undefined)
    }

    return (
        <div className="p-3">
            <h2 className="text-sm font-bold mb-3">Payment Information</h2>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col">
                    <label htmlFor="cardName" className="mb-1 text-xs font-medium">Name of Cardholder:</label>
                    <input
                        className={errors.cardName ? inputError : inputValid}
                        type="text" id="cardName" name="cardName" required
                        placeholder="First Last"
                        value={data.cardName} onChange={handleCardName} />
                    {errors.cardName && <p className="text-red-500 text-xs mt-0.5">{errors.cardName}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="cardNumber" className="mb-1 text-xs font-medium">Card Number:</label>
                    <input
                        className={errors.cardNumber ? inputError : inputValid}
                        type="text" id="cardNumber" name="cardNumber" required
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={data.cardNumber} onChange={handleCardNumber} />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-0.5">{errors.cardNumber}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-xs font-medium">Expiry Date:</label>
                    <div className="flex gap-2">
                        <select className={selectBase} value={expiryMonth} onChange={handleExpiryMonth} required>
                            <option value="">MM</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select className={selectBase} value={expiryYear} onChange={handleExpiryYear} required>
                            <option value="">YY</option>
                            {years.map(y => (
                                <option key={y} value={String(y).slice(-2)}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="cvv" className="mb-1 text-xs font-medium">CVV:</label>
                    <input
                        className={errors.cvv ? inputError : inputValid}
                        type="text" id="cvv" name="cvv" required
                        placeholder="123"
                        maxLength={3}
                        value={data.cvv} onChange={handleCvv} />
                    {errors.cvv && <p className="text-red-500 text-xs mt-0.5">{errors.cvv}</p>}
                </div>
            </form>
        </div>
    )
}

export default PaymentDetails
