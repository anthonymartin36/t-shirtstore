import api, { storeToken, clearToken } from './request'
import { LoginCustomerType, RegisterCustomerType } from '../types/login'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'

// POST login (/api/v1/glogin)
export async function gloginCustomerApi(idToken: string): Promise<LoginCustomerType> {
  try {
    const response = await api
      .post(`${rootUrl}/glogin`)
      .send({ id_token: idToken })
    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (token) storeToken(token)
    return response.body
  } catch (error) {
    console.error('Error logging in a Customer', error); throw error
  }
}

// POST register (/api/v1/gregister)
export async function gregisterCustomerApi(name: string, email: string, password: string, password_confirmation: string): Promise<RegisterCustomerType> {
  try {
    const response = await api
      .post(`${rootUrl}/gregister`)
      .send({ customer: { name, email, password, password_confirmation } })
    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (token) storeToken(token)
    return response.body
  } catch (error) {
    console.error('Error registering a Customer', error); throw error
  }
}

// DELETE logout (/api/v1/glogout)
export async function glogoutCustomerApi(): Promise<void> {
  try {
    await api.delete(`${rootUrl}/glogout`)
    clearToken()
  } catch (error) {
    console.error('Error logging out a Customer', error); throw error
  }
}
