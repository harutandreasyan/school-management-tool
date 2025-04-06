import { useState, useEffect, ChangeEvent } from 'react'
import {
	TextField,
	Typography,
	Button,
	List,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TEACHERS, CREATE_TEACHER } from './api'
import TeacherForm from './TeacherForm'
import { TeachersQueryData } from '../../types'

const Teachers: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [debouncedSearchTerm, setDebouncedSearchTerm] =
		useState<string>(searchTerm)
	const [openForm, setOpenForm] = useState<boolean>(false)
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm)
		}, 500)
		return () => clearTimeout(timer)
	}, [searchTerm])

	const { data, loading, error } = useQuery<TeachersQueryData>(GET_TEACHERS, {
		variables: { page: 1, search: debouncedSearchTerm },
	})

	const [createTeacher] = useMutation(CREATE_TEACHER, {
		onCompleted: () => {
			setOpenForm(false)
		},
	})

	if (loading) return <Typography>Loading...</Typography>
	if (error) return <Typography color='error'>{error.message}</Typography>

	const handleFormSubmit = (formData: any) => {
		createTeacher({
			variables: {
				name: formData.name,
				surname: formData.surname,
				subjectIds: formData.subjectIds,
			},
		})
	}

	return (
		<div>
			<Typography variant='h5'>Teachers</Typography>
			<TextField
				label='Search Teachers'
				fullWidth
				margin='normal'
				value={searchTerm}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearchTerm(e.target.value)
				}
			/>
			<List>
				{data?.teachers.map((teacher) => (
					<ListItemButton
						key={teacher.id}
						onClick={() => navigate(`/dashboard/teacher/${teacher.id}`)}
					>
						<Typography>{`${teacher.name} ${teacher.surname}`}</Typography>
					</ListItemButton>
				))}
			</List>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setOpenForm(true)}
			>
				Add Teacher
			</Button>
			<Dialog open={openForm} onClose={() => setOpenForm(false)}>
				<DialogTitle>Add Teacher</DialogTitle>
				<DialogContent>
					<TeacherForm onSubmit={handleFormSubmit} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default Teachers
