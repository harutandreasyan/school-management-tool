import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/auth/Login'

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!localStorage.getItem('token')
	)

	return (
		<Routes>
			<Route
				path='/login'
				element={<Login onLogin={() => setIsAuthenticated(true)} />}
			/>
			<Route
				path='/dashboard/*'
				element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />}
			/>
			<Route
				path='*'
				element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
			/>
		</Routes>
	)
}

export default App
