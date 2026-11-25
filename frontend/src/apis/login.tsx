import api, { storeToken, clearToken } from './request'
import { LoginCustomerType, RegisterCustomerType } from '../types/login'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

// POST login (/api/v1/login)
export async function loginCustomerApi(email: string, password: string): Promise<LoginCustomerType> {
  try {
    const response = await api
      .post(`${rootUrl}/login`)
      .send({ customer: { email, password } })
    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (token) storeToken(token)
    return response.body
  } catch (error) {
    console.error('Error logging in a Customer', error); throw error
  }
}

// POST register (/api/v1/register)
export async function registerCustomerApi(name: string, email: string, password: string, password_confirmation: string): Promise<RegisterCustomerType> {
  try {
    const response = await api
      .post(`${rootUrl}/register`)
      .send({ customer: { name, email, password, password_confirmation } })
    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (token) storeToken(token)
    return response.body
  } catch (error) {
    console.error('Error registering a Customer', error); throw error
  }
}

// POST reset password (/api/v1/reset_password)
export async function resetCustomerPasswordApi(email: string): Promise<void> {
  try {
    await api
      .post(`${rootUrl}/reset_password`)
      .send({ customer: { email } })
  } catch (error) {
    console.error('Error resetting password for a Customer', error); throw error
  }
}

// PUT update password (/api/v1/reset_password)
export async function updateCustomerPasswordApi(token: string, password: string, password_confirmation: string): Promise<void> {
  try {
    await api
      .put(`${rootUrl}/reset_password`)
      .send({ customer: { reset_password_token: token, password, password_confirmation } })
  } catch (error) {
    console.error('Error updating password', error); throw error
  }
}

// GET confirm email (/api/v1/confirmation?confirmation_token=TOKEN)
export async function confirmEmailApi(token: string): Promise<void> {
  try {
    await api.get(`${rootUrl}/confirmation`).query({ confirmation_token: token })
  } catch (error) {
    console.error('Error confirming email', error); throw error
  }
}

// DELETE logout (/api/v1/logout)
export async function logoutCustomerApi(): Promise<void> {
  try {
    await api.delete(`${rootUrl}/logout`)
  } catch (error) {
    console.error('Error logging out a Customer', error)
  } finally {
    clearToken()
  }
}
