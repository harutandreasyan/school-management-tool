import { Teacher } from './teacher.types'

export interface Subject {
	id: number
	name: string
	grade: number
	teacher: Teacher
}

export interface SubjectFormData {
	name: string
	grade: string
	teacherId: string
}
