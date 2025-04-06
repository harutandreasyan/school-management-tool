export interface Pupil {
	id: number
	name: string
	surname: string
	grade: number
}

export interface PupilFormData {
	name: string
	surname: string
	grade: string
	subjectIds: number[]
}

export interface PupilsQueryData {
	pupils: Pupil[]
}
