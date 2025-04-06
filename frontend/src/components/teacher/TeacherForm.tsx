import { useState, ChangeEvent } from 'react'
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Box,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_SUBJECTS } from '../subject/api'
import { TeacherFormData } from '../../types'

interface TeacherFormProps {
	onSubmit: (data: TeacherFormData) => void
	initialData?: Partial<TeacherFormData>
}

const TeacherForm: React.FC<TeacherFormProps> = ({
	onSubmit,
	initialData = {},
}) => {
	const [name, setName] = useState<string>(initialData.name || '')
	const [surname, setSurname] = useState<string>(initialData.surname || '')
	const [selectedSubjects, setSelectedSubjects] = useState<number[]>(
		initialData.subjectIds || []
	)
	const [errors, setErrors] = useState<{ name: string; surname: string }>({
		name: '',
		surname: '',
	})
	const { data, loading } = useQuery(GET_SUBJECTS)

	const validate = () => {
		let valid = true
		const newErrors = { name: '', surname: '' }
		if (!name.trim()) {
			newErrors.name = 'Name is required'
			valid = false
		}
		if (!surname.trim()) {
			newErrors.surname = 'Surname is required'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}

	const handleSubmit = () => {
		if (validate()) {
			onSubmit({ name, surname, subjectIds: selectedSubjects })
		}
	}

	if (loading) return null

	return (
		<div>
			<TextField
				label='Teacher Name'
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				fullWidth
				margin='normal'
				error={!!errors.name}
				helperText={errors.name}
			/>
			<TextField
				label='Teacher Surname'
				value={surname}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSurname(e.target.value)
				}
				fullWidth
				margin='normal'
				error={!!errors.surname}
				helperText={errors.surname}
			/>
			<FormControl fullWidth margin='normal'>
				<InputLabel id='subjects-label'>Subjects</InputLabel>
				<Select
					labelId='subjects-label'
					multiple
					value={selectedSubjects}
					onChange={(e) => setSelectedSubjects(e.target.value as number[])}
					input={<OutlinedInput label='Subjects' />}
					renderValue={(selected) =>
						(selected as number[])
							.map((id) => {
								const subj = data.subjects.find((s: any) => s.id === id)
								return subj ? subj.name : id
							})
							.join(', ')
					}
				>
					{data.subjects.map((option: any) => (
						<MenuItem key={option.id} value={option.id}>
							{option.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Box sx={{ mt: 2 }}>
				<Button variant='contained' color='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Box>
		</div>
	)
}

export default TeacherForm
