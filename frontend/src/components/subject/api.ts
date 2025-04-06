import { gql } from '@apollo/client'

export const GET_SUBJECTS = gql`
	query GetSubjects($page: Int, $search: String) {
		subjects(page: $page, search: $search) {
			id
			name
			grade
			teacher {
				id
				name
				surname
			}
		}
	}
`

export const DELETE_SUBJECT = gql`
	mutation DeleteSubject($id: Int!) {
		deleteSubject(id: $id) {
			id
		}
	}
`

export const CREATE_SUBJECT = gql`
	mutation CreateSubject($name: String!, $grade: Int!, $teacherId: Int!) {
		createSubject(name: $name, grade: $grade, teacherId: $teacherId) {
			id
			name
			grade
			teacher {
				id
				name
				surname
			}
		}
	}
`
