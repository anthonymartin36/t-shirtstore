import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import PageLayout from '../../components/PageLayout'
import { confirmEmailApi } from '../../apis/login'

type Status = 'awaiting' | 'confirming' | 'success' | 'error'

const ConfirmEmail: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<Status>(token ? 'confirming' : 'awaiting')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token) return
    confirmEmailApi(token)
      .then(() => setStatus('success'))
      .catch(() => {
        setErrorMessage('This confirmation link has expired or is invalid. Please request a new one.')
        setStatus('error')
      })
  }, [token])

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          {status === 'awaiting' && (
            <>
              <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Check your email
              </h2>
              <p className="mt-4 text-gray-600">
                We sent a confirmation link to your email address. Click the link to activate your account.
              </p>
              <p className="mt-6 text-sm text-gray-500">
                Already confirmed?{' '}
                <Link to="/Login" className="font-semibold text-red-800 hover:text-red-700">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {status === 'confirming' && (
            <p className="mt-10 text-gray-600">Confirming your email address...</p>
          )}

          {status === 'success' && (
            <>
              <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Email confirmed!
              </h2>
              <p className="mt-4 text-gray-600">
                Your email address has been confirmed. You can now sign in to your account.
              </p>
              <div className="mt-6">
                <Link
                  to="/Login"
                  className="rounded-md bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Sign in
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Confirmation failed
              </h2>
              <p className="mt-4 text-red-600">{errorMessage}</p>
              <p className="mt-6 text-sm text-gray-500">
                Need a new link?{' '}
                <Link to="/Login" className="font-semibold text-red-800 hover:text-red-700">
                  Sign in to resend
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default ConfirmEmail
