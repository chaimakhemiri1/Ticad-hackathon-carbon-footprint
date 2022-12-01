
import { useNavigate } from '@remix-run/react'
import { getClient } from '~/axios'
import { useState } from 'react'

export function useLogin() {

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<null | string>(null)
  const goto = useNavigate()

  async function login(email: string, password: string) {
    try {
      setLoading(true)
      const { data } = await getClient().post('/authentify/login', {
        email,
        password,
      })


      localStorage.setItem('token', data.token)
      setLoading(false)
      goto('/d')
    } catch (error: any) {
      
      setLoading(false)
      setError(error.response.data)
    }
  }

  return {
    loading,
    error,
    login,
  }
}
