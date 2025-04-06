import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from './api'
import {
	LoginMutationResponse,
	LoginMutationVariables,
} from '../../types'

interface LoginProps {
	onLogin?: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	const [login] = useMutation<LoginMutationResponse, LoginMutationVariables>(
		LOGIN_MUTATION,
		{
			onCompleted: (data) => {
				localStorage.setItem('token', data.login.token)
				onLogin && onLogin()
				navigate('/dashboard')
			},
			onError: (err) => {
				setError(err.message)
			},
		}
	)

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: ChangeEvent<HTMLInputElement>) =>
			setter(e.target.value)

	const handleLogin = () => {
		login({ variables: { username, password } })
	}

	return (
		<Container maxWidth='sm'>
			<Box sx={{ mt: 8 }}>
				<Typography variant='h4' gutterBottom>
					Admin Login
				</Typography>
				{error && <Typography color='error'>{error}</Typography>}
				<TextField
					label='Username'
					fullWidth
					margin='normal'
					value={username}
					onChange={handleChange(setUsername)}
				/>
				<TextField
					label='Password'
					type='password'
					fullWidth
					margin='normal'
					value={password}
					onChange={handleChange(setPassword)}
				/>
				<Button variant='contained' color='primary' onClick={handleLogin}>
					Login
				</Button>
			</Box>
		</Container>
	)
}

export default Login
