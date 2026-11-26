import React, { useState, useEffect, useRef } from 'react'
import { ShippingData } from '../../pages/ProductCategory/types'

interface Props {
    data: ShippingData
    onChange: (data: ShippingData) => void
}

type PostcodeStatus = 'idle' | 'checking' | 'valid' | 'invalid'

const COUNTRIES: { name: string; code: string }[] = [
    { name: 'Australia',       code: 'AU' },
    { name: 'Austria',         code: 'AT' },
    { name: 'Belgium',         code: 'BE' },
    { name: 'Brazil',          code: 'BR' },
    { name: 'Canada',          code: 'CA' },
    { name: 'Denmark',         code: 'DK' },
    { name: 'Finland',         code: 'FI' },
    { name: 'France',          code: 'FR' },
    { name: 'Germany',         code: 'DE' },
    { name: 'Ireland',         code: 'IE' },
    { name: 'Italy',           code: 'IT' },
    { name: 'Japan',           code: 'JP' },
    { name: 'Mexico',          code: 'MX' },
    { name: 'Netherlands',     code: 'NL' },
    { name: 'New Zealand',     code: 'NZ' },
    { name: 'Norway',          code: 'NO' },
    { name: 'Poland',          code: 'PL' },
    { name: 'Portugal',        code: 'PT' },
    { name: 'South Africa',    code: 'ZA' },
    { name: 'Spain',           code: 'ES' },
    { name: 'Sweden',          code: 'SE' },
    { name: 'Switzerland',     code: 'CH' },
    { name: 'United Kingdom',  code: 'GB' },
    { name: 'United States',   code: 'US' },
]

const inputBase = "border rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 bg-[var(--surface-color)]"
const inputNormal  = `${inputBase} border-gray-300 focus:ring-blue-500`
const inputErr     = `${inputBase} border-red-500   focus:ring-red-500`
const inputOk      = `${inputBase} border-green-500 focus:ring-green-500`
const selectClass  = "border border-gray-300 rounded-md p-1.5 text-xs w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--surface-color)]"

const ShippingDetails: React.FC<Props> = ({ data, onChange }) => {
    const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({})
    const [postcodeStatus, setPostcodeStatus] = useState<PostcodeStatus>('idle')
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const setError = (field: keyof ShippingData, msg: string | undefined) =>
        setErrors(prev => ({ ...prev, [field]: msg }))

    const countryCode = COUNTRIES.find(c => c.name === data.country)?.code ?? ''

    const checkPostcode = async (code: string, postcode: string) => {
        setPostcodeStatus('checking')
        try {
            // Zippopotam.us: free, no API key, ~60 countries supported
            // UK expects the outward code only (e.g. "SW1A" from "SW1A 1AA")
            const lookup = code === 'GB' ? postcode.split(' ')[0] : postcode.replace(/\s/g, '')
            const res = await fetch(`https://api.zippopotam.us/${code.toLowerCase()}/${lookup}`)
            setPostcodeStatus(res.ok ? 'valid' : 'invalid')
        } catch {
            setPostcodeStatus('idle')
        }
    }

    const schedulePostcodeCheck = (code: string, postcode: string) => {
        setPostcodeStatus('idle')
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (code && postcode.trim().length >= 3) {
            debounceRef.current = setTimeout(() => checkPostcode(code, postcode.trim()), 700)
        }
    }

    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

    const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s'\-]/g, '')
        onChange({ ...data, fullName: value })
        const words = value.trim().split(/\s+/).filter(Boolean)
        setError('fullName', words.length < 2 ? 'Enter first and last name' : undefined)
    }

    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onChange({ ...data, address: value })
        setError('address', value.trim().length < 5 ? 'Enter a valid address' : undefined)
    }

    const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s\-]/g, '')
        onChange({ ...data, city: value })
        setError('city', value.trim().length < 2 ? 'Enter a valid city' : undefined)
    }

    const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountry = e.target.value
        const newCode = COUNTRIES.find(c => c.name === newCountry)?.code ?? ''
        onChange({ ...data, country: newCountry })
        schedulePostcodeCheck(newCode, data.postalCode)
    }

    const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9\s\-]/g, '')
        onChange({ ...data, postalCode: value })
        schedulePostcodeCheck(countryCode, value)
    }

    const postalClass = postcodeStatus === 'valid'   ? inputOk
                      : postcodeStatus === 'invalid' ? inputErr
                      : inputNormal

    return (
        <div className="p-3">
            <h4 className="text-sm font-bold mb-3">Shipping Address</h4>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>

                <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-1 text-xs font-medium">Full Name:</label>
                    <input
                        type="text" id="fullName" name="fullName" required
                        className={errors.fullName ? inputErr : inputNormal}
                        placeholder="First Last"
                        value={data.fullName} onChange={handleFullName} />
                    {errors.fullName && <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-1 text-xs font-medium">Address:</label>
                    <input
                        type="text" id="address" name="address" required
                        className={errors.address ? inputErr : inputNormal}
                        placeholder="123 Main Street"
                        value={data.address} onChange={handleAddress} />
                    {errors.address && <p className="text-red-500 text-xs mt-0.5">{errors.address}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="city" className="mb-1 text-xs font-medium">City:</label>
                    <input
                        type="text" id="city" name="city" required
                        className={errors.city ? inputErr : inputNormal}
                        placeholder="City"
                        value={data.city} onChange={handleCity} />
                    {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="country" className="mb-1 text-xs font-medium">Country:</label>
                    <select
                        id="country" name="country" required
                        className={selectClass}
                        value={data.country} onChange={handleCountry}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => (
                            <option key={c.code} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="postalCode" className="mb-1 text-xs font-medium">Postal Code:</label>
                    <input
                        type="text" id="postalCode" name="postalCode" required
                        className={postalClass}
                        placeholder="Postal / ZIP code"
                        value={data.postalCode} onChange={handlePostalCode} />
                    {postcodeStatus === 'checking' && (
                        <p className="text-blue-500 text-xs mt-0.5">Checking...</p>
                    )}
                    {postcodeStatus === 'valid' && (
                        <p className="text-green-600 text-xs mt-0.5">Valid postcode</p>
                    )}
                    {postcodeStatus === 'invalid' && (
                        <p className="text-red-500 text-xs mt-0.5">Postcode not recognised for selected country</p>
                    )}
                </div>

            </form>
        </div>
    )
}

export default ShippingDetails
