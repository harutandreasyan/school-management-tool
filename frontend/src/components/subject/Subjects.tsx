import { useState } from 'react'
import {
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { GET_SUBJECTS, DELETE_SUBJECT, CREATE_SUBJECT } from './api'
import SubjectForm from './SubjectForm'
import DeleteModal from '../modals/DeleteModal'
import { Subject } from '../../types'

interface SubjectsQueryData {
	subjects: Subject[]
}

const Subjects: React.FC = () => {
	const { data, loading, error, refetch } = useQuery<SubjectsQueryData>(
		GET_SUBJECTS,
		{
			variables: { page: 1, search: '' },
		}
	)

	const [deleteSubject] = useMutation(DELETE_SUBJECT, {
		onCompleted: () => refetch(),
	})

	const [createSubject] = useMutation(CREATE_SUBJECT, {
		onCompleted: () => refetch(),
	})

	const [openForm, setOpenForm] = useState<boolean>(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
	const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null)

	if (loading) return <Typography>Loading...</Typography>
	if (error) return <Typography color='error'>{error.message}</Typography>

	const handleAddSubject = (formData: any) => {
		createSubject({
			variables: {
				name: formData.name,
				grade: parseInt(formData.grade),
				teacherId: parseInt(formData.teacherId),
			},
		})
		setOpenForm(false)
	}

	const openDeleteModal = (subject: Subject) => {
		setSubjectToDelete(subject)
		setDeleteModalOpen(true)
	}

	const handleDeleteConfirm = () => {
		if (subjectToDelete) {
			deleteSubject({ variables: { id: subjectToDelete.id } })
			setDeleteModalOpen(false)
			setSubjectToDelete(null)
		}
	}

	return (
		<div>
			<Typography variant='h5'>Subjects</Typography>
			<List>
				{data?.subjects.map((subject) => (
					<ListItem
						key={subject.id}
						secondaryAction={
							<IconButton edge='end' onClick={() => openDeleteModal(subject)}>
								Delete
							</IconButton>
						}
					>
						<ListItemText
							primary={`${subject.name} (Grade: ${subject.grade})`}
							secondary={`Teacher: ${subject.teacher.name} ${subject.teacher.surname}`}
						/>
					</ListItem>
				))}
			</List>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setOpenForm(true)}
			>
				Add Subject
			</Button>
			<Dialog
				open={openForm}
				onClose={() => setOpenForm(false)}
				disableEnforceFocus
			>
				<DialogTitle>Add Subject</DialogTitle>
				<DialogContent>
					<SubjectForm onSubmit={handleAddSubject} />
				</DialogContent>
			</Dialog>
			<DeleteModal
				open={deleteModalOpen}
				title='Delete Subject'
				message={`Are you sure you want to delete subject ${
					subjectToDelete ? subjectToDelete.name : ''
				}?`}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteModalOpen(false)}
			/>
		</div>
	)
}

export default Subjects
