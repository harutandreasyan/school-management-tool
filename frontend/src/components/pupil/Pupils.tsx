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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PUPILS, CREATE_PUPIL, DELETE_PUPIL } from './api'
import PupilForm from './PupilForm'
import DeleteModal from '../modals/DeleteModal'
import { Pupil, PupilFormData, PupilsQueryData } from '../../types'

const Pupils: React.FC = () => {
	const [selectedGrade, setSelectedGrade] = useState<string>('')
	const [openForm, setOpenForm] = useState<boolean>(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
	const [pupilToDelete, setPupilToDelete] = useState<Pupil | null>(null)
	const grades = ['5', '6', '7', '8', '9', '10']

	const { data, loading, error, refetch } = useQuery<PupilsQueryData>(
		GET_PUPILS,
		{
			variables: {
				page: 1,
				search: '',
				grade: selectedGrade ? parseInt(selectedGrade) : undefined,
			},
		}
	)

	const [createPupil] = useMutation(CREATE_PUPIL, {
		onCompleted: () => {
			refetch()
			setOpenForm(false)
		},
	})

	const [deletePupil] = useMutation(DELETE_PUPIL, {
		onCompleted: () => refetch(),
	})

	if (loading) return <Typography>Loading...</Typography>
	if (error) return <Typography color='error'>{error.message}</Typography>

	const handleFormSubmit = (formData: PupilFormData) => {
		createPupil({
			variables: {
				name: formData.name,
				surname: formData.surname,
				grade: parseInt(formData.grade),
				subjectIds: formData.subjectIds,
			},
		})
	}

	const openDeleteModal = (pupil: Pupil) => {
		setPupilToDelete(pupil)
		setDeleteModalOpen(true)
	}

	const handleDeleteConfirm = () => {
		if (pupilToDelete) {
			deletePupil({ variables: { id: pupilToDelete.id } })
			setDeleteModalOpen(false)
			setPupilToDelete(null)
		}
	}

	return (
		<div>
			<Typography variant='h5'>Pupils</Typography>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id='grade-select-label'>Select Grade</InputLabel>
				<Select
					labelId='grade-select-label'
					value={selectedGrade}
					label='Select Grade'
					onChange={(e) => setSelectedGrade(e.target.value as string)}
				>
					<MenuItem value=''>
						<em>All</em>
					</MenuItem>
					{grades.map((g) => (
						<MenuItem key={g} value={g}>
							{g}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<List>
				{data?.pupils.map((pupil) => (
					<ListItem
						key={pupil.id}
						secondaryAction={
							<IconButton edge='end' onClick={() => openDeleteModal(pupil)}>
								Delete
							</IconButton>
						}
					>
						<ListItemText
							primary={`${pupil.name} ${pupil.surname} (Grade: ${pupil.grade})`}
						/>
					</ListItem>
				))}
			</List>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setOpenForm(true)}
			>
				Add Pupil
			</Button>
			<Dialog open={openForm} onClose={() => setOpenForm(false)}>
				<DialogTitle>Add Pupil</DialogTitle>
				<DialogContent>
					<PupilForm onSubmit={handleFormSubmit} />
				</DialogContent>
			</Dialog>
			<DeleteModal
				open={deleteModalOpen}
				title='Delete Pupil'
				message={`Are you sure you want to delete pupil ${
					pupilToDelete ? `${pupilToDelete.name} ${pupilToDelete.surname}` : ''
				}?`}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteModalOpen(false)}
			/>
		</div>
	)
}

export default Pupils
