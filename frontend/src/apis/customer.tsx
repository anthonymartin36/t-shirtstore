import api from './request'
import { CustomerType } from '../types/customer.tsx'
const rootUrl = import.meta.env.VITE_NODE_API_URL + '/api/v1'


// GET a customer (/api/v1/customer/:id)
export async function getACustomerApi(id: Number): Promise<CustomerType> {
  try {
    const response = await api.get(`${rootUrl}/customer/${id}`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching a Customer', error)
  }
}
