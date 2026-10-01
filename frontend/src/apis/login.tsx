import request from 'superagent'
import { LoginCustomerType, RegisterCustomerType } from '../types/login'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1' 
import bcrypt from 'bcryptjs'

// Hash the password with a salt of 10

// POST login a customer (/api/v1/login)
export async function loginCustomerApi(email: string, password: string): Promise<LoginCustomerType> {
  const hashedPassword = bcrypt.hashSync(password, 10) 
  try {
    const response = await request
      .post(`${rootUrl}/login`)
      .send({ email, password: hashedPassword })
    return response.body
  } catch (error) {
    throw console.error('Error logging in a Customer', error)
  }
}

// POST register a customer (/api/v1/register)
export async function registerCustomerApi(name: string, email: string, password: string): Promise<RegisterCustomerType> {
  const hashedPassword = bcrypt.hashSync(password, 10) 
  try {
    const response = await request
      .post(`${rootUrl}/register`)
      .send({ name, email, password: hashedPassword })
    return response.body
  } catch (error) {
    throw console.error('Error registering a Customer', error)
  }
}

// POST logout a customer (/api/v1/logout)
export async function logoutCustomerApi(id: number): Promise<void> {
  try {
    await request.post(`${rootUrl}/logout/${id}`)
  } catch (error) {
    throw console.error('Error logging out a Customer', error)
  }
}

