import { Subject } from './subject.types'

export interface Teacher {
	id: number
	name: string
	surname: string
	subjects?: Subject[]
}

export interface TeacherFormData {
	name: string
	surname: string
	subjectIds: number[]
}

export interface TeacherQueryData {
	teacher: Teacher
}

export interface TeachersQueryData {
	teachers: Teacher[]
}
