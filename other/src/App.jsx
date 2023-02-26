import React from 'react'
import Login from './Pages/Login'
import { useAuthState } from './Context'
import Dashboard from './Pages/Dashboard'

export default function App() {
    const { token } = useAuthState()
    return (
        <>
            {token ? <Dashboard /> : <Login />}
        </>
    )
}
