import { useState } from 'react'
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	FormHelperText,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_TEACHERS } from '../teacher/api'
import { SubjectFormData } from '../../types'

interface SubjectFormProps {
	onSubmit: (data: SubjectFormData) => void
	initialData?: Partial<SubjectFormData>
}

const SubjectForm: React.FC<SubjectFormProps> = ({
	onSubmit,
	initialData = {},
}) => {
	const [name, setName] = useState<string>(initialData.name || '')
	const [grade, setGrade] = useState<string>(initialData.grade || '')
	const [teacherId, setTeacherId] = useState<string>(
		initialData.teacherId || ''
	)
	const [errors, setErrors] = useState<{
		name: string
		grade: string
		teacherId: string
	}>({ name: '', grade: '', teacherId: '' })
	const { data, loading } = useQuery(GET_TEACHERS)
	const grades = ['5', '6', '7', '8', '9', '10']

	const validate = () => {
		let valid = true
		const newErrors = { name: '', grade: '', teacherId: '' }
		if (!name.trim()) {
			newErrors.name = 'Subject name is required'
			valid = false
		}
		if (!grade) {
			newErrors.grade = 'Grade is required'
			valid = false
		}
		if (!teacherId) {
			newErrors.teacherId = 'Teacher is required'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}

	const handleSubmit = () => {
		if (validate()) {
			onSubmit({ name, grade, teacherId })
		}
	}

	if (loading) return null

	return (
		<div>
			<TextField
				label='Subject Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				margin='normal'
				error={!!errors.name}
				helperText={errors.name}
			/>
			<FormControl fullWidth margin='normal' error={!!errors.grade}>
				<InputLabel id='grade-label'>Grade</InputLabel>
				<Select
					labelId='grade-label'
					value={grade}
					label='Grade'
					onChange={(e) => setGrade(e.target.value as string)}
				>
					{grades.map((g) => (
						<MenuItem key={g} value={g}>
							{g}
						</MenuItem>
					))}
				</Select>
				{errors.grade && <FormHelperText>{errors.grade}</FormHelperText>}
			</FormControl>
			<FormControl fullWidth margin='normal' error={!!errors.teacherId}>
				<InputLabel id='teacher-label'>Teacher</InputLabel>
				<Select
					labelId='teacher-label'
					value={teacherId}
					label='Teacher'
					onChange={(e) => setTeacherId(e.target.value as string)}
				>
					{data.teachers.map((t: any) => (
						<MenuItem key={t.id} value={t.id}>
							{t.name} {t.surname}
						</MenuItem>
					))}
				</Select>
				{errors.teacherId && (
					<FormHelperText>{errors.teacherId}</FormHelperText>
				)}
			</FormControl>
			<Box sx={{ mt: 2 }}>
				<Button variant='contained' color='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Box>
		</div>
	)
}

export default SubjectForm
