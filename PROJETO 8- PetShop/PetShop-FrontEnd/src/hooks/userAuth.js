import api from '../utils/api'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFlashMessage from './userFlashMessage'


export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { setFlashMessage } = useFlashMessage()



  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  async function login(user) {
    let msgText = 'Login realizado com sucesso!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', data.token)
    history.push('/')
  }

  function logout() {
    const msgText = 'Logout realizado com sucesso!'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    history.push('/login')

    setFlashMessage(msgText, msgType)
  }

  return { authenticated, loading, register, login, logout }
}
