import { useAuth0 } from "@auth0/auth0-react"

const useIsAuthenticated = () => {
  const auth0Bool = useAuth0().isAuthenticated
  const hasJwt = !!localStorage.getItem('auth_token')
  return auth0Bool || hasJwt
}
interface Props {
  children: React.ReactNode
}
export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}