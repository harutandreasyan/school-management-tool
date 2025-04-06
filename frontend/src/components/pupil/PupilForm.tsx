import { useState, ChangeEvent } from 'react'
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
import { PupilFormData } from '../../types'

interface PupilFormProps {
	onSubmit: (data: PupilFormData) => void
	initialData?: Partial<PupilFormData>
}

const PupilForm: React.FC<PupilFormProps> = ({
	onSubmit,
	initialData = {},
}) => {
	const [name, setName] = useState<string>(initialData.name || '')
	const [surname, setSurname] = useState<string>(initialData.surname || '')
	const [grade, setGrade] = useState<string>(initialData.grade || '')
	const [errors, setErrors] = useState<{
		name: string
		surname: string
		grade: string
	}>({ name: '', surname: '', grade: '' })
	const grades = ['5', '6', '7', '8', '9', '10']

	const validate = () => {
		let valid = true
		const newErrors = { name: '', surname: '', grade: '' }
		if (!name.trim()) {
			newErrors.name = 'Name is required'
			valid = false
		}
		if (!surname.trim()) {
			newErrors.surname = 'Surname is required'
			valid = false
		}
		if (!grade) {
			newErrors.grade = 'Grade is required'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}

	const handleSubmit = () => {
		if (validate()) {
			onSubmit({ name, surname, grade, subjectIds: [] })
		}
	}

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setter(e.target.value)

	return (
		<div>
			<TextField
				label='Pupil Name'
				value={name}
				onChange={handleChange(setName)}
				fullWidth
				margin='normal'
				error={!!errors.name}
				helperText={errors.name}
			/>
			<TextField
				label='Pupil Surname'
				value={surname}
				onChange={handleChange(setSurname)}
				fullWidth
				margin='normal'
				error={!!errors.surname}
				helperText={errors.surname}
			/>
			<FormControl fullWidth margin='normal' error={!!errors.grade}>
				<InputLabel id='pupil-grade-label'>Grade</InputLabel>
				<Select
					labelId='pupil-grade-label'
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
			<Box sx={{ mt: 2 }}>
				<Button variant='contained' color='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Box>
		</div>
	)
}

export default PupilForm
