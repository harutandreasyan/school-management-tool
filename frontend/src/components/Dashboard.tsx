import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container } from '@mui/material'
import Teachers from './teacher/Teachers'
import TeacherDetails from './teacher/TeacherDetails'
import Pupils from './pupil/Pupils'
import Subjects from './subject/Subjects'
import LogoutModal from './modals/LogoutModal'

const Dashboard: React.FC = () => {
	const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)

	const handleLogoutConfirm = () => {
		localStorage.removeItem('token')
		window.location.href = '/login'
	}

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Button color='inherit' component={Link} to='/dashboard/teachers'>
						Teachers
					</Button>
					<Button color='inherit' component={Link} to='/dashboard/pupils'>
						Pupils
					</Button>
					<Button color='inherit' component={Link} to='/dashboard/subjects'>
						Subjects
					</Button>
					<Button color='inherit' onClick={() => setLogoutModalOpen(true)}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 4 }}>
				<Routes>
					<Route path='teachers' element={<Teachers />} />
					<Route path='teacher/:id' element={<TeacherDetails />} />
					<Route path='pupils' element={<Pupils />} />
					<Route path='subjects' element={<Subjects />} />
				</Routes>
			</Container>
			<LogoutModal
				open={logoutModalOpen}
				onConfirm={handleLogoutConfirm}
				onCancel={() => setLogoutModalOpen(false)}
			/>
		</>
	)
}

export default Dashboard
