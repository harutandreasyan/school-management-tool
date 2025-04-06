import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Container,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TEACHER, UPDATE_TEACHER, DELETE_TEACHER } from './api'
import TeacherForm from './TeacherForm'
import DeleteModal from '../modals/DeleteModal'
import { TeacherQueryData } from '../../types'

const TeacherDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { data, loading, error, refetch } = useQuery<TeacherQueryData>(
		GET_TEACHER,
		{
			variables: { id: parseInt(id!) },
		}
	)
	const [updateTeacher] = useMutation(UPDATE_TEACHER, {
		onCompleted: () => {
			refetch()
			setEditOpen(false)
		},
	})
	const [deleteTeacher] = useMutation(DELETE_TEACHER, {
		onCompleted: () => {
			window.location.href = '/dashboard/teachers'
		},
	})
	const [editOpen, setEditOpen] = useState<boolean>(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

	if (loading) return <Typography>Loading...</Typography>
	if (error) return <Typography color='error'>{error.message}</Typography>
	if (!data?.teacher) return <Typography>No teacher found</Typography>

	const handleEditSubmit = (formData: any) => {
		updateTeacher({
			variables: {
				id: parseInt(id!),
				name: formData.name,
				surname: formData.surname,
				subjectIds: formData.subjectIds,
			},
		})
	}

	const handleDeleteConfirm = () => {
		deleteTeacher({ variables: { id: parseInt(id!) } })
		setDeleteModalOpen(false)
	}

	return (
		<Container>
			<Typography variant='h4'>
				{data.teacher.name} {data.teacher.surname}
			</Typography>
			<Typography variant='h6' sx={{ mt: 2 }}>
				Subjects:
			</Typography>
			<List>
				{data.teacher.subjects?.map((subj) => (
					<ListItem key={subj.id}>
						<ListItemText primary={`${subj.name} (Grade: ${subj.grade})`} />
					</ListItem>
				))}
			</List>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setEditOpen(true)}
				sx={{ mr: 2 }}
			>
				Edit
			</Button>
			<Button
				variant='outlined'
				color='error'
				onClick={() => setDeleteModalOpen(true)}
			>
				Delete
			</Button>

			<Dialog open={editOpen} onClose={() => setEditOpen(false)}>
				<DialogTitle>Edit Teacher</DialogTitle>
				<DialogContent>
					<TeacherForm
						onSubmit={handleEditSubmit}
						initialData={{
							name: data.teacher.name,
							surname: data.teacher.surname,
							subjectIds: data.teacher.subjects?.map((s) => s.id),
						}}
					/>
				</DialogContent>
			</Dialog>

			<DeleteModal
				open={deleteModalOpen}
				title='Delete Teacher'
				message={`Are you sure you want to delete teacher ${data.teacher.name} ${data.teacher.surname}?`}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteModalOpen(false)}
			/>
		</Container>
	)
}

export default TeacherDetails
