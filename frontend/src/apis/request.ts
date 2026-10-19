import request from 'superagent'

const getToken = () => localStorage.getItem('auth_token')

const withAuth = (req: any) => {
  req.withCredentials()
  const token = getToken()
  if (token) req.set('Authorization', `Bearer ${token}`)
  return req
}

const api = {
  get:    (url: string) => withAuth(request.get(url)),
  post:   (url: string) => withAuth(request.post(url)),
  patch:  (url: string) => withAuth(request.patch(url)),
  put:    (url: string) => withAuth(request.put(url)),
  delete: (url: string) => withAuth(request.delete(url)),
}

export const storeToken = (token: string) => localStorage.setItem('auth_token', token)
export const clearToken = () => localStorage.removeItem('auth_token')
export const getStoredToken = getToken

export default api
