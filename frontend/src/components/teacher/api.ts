import { gql } from '@apollo/client'

export const GET_TEACHERS = gql`
	query GetTeachers($page: Int, $search: String) {
		teachers(page: $page, search: $search) {
			id
			name
			surname
		}
	}
`

export const CREATE_TEACHER = gql`
	mutation CreateTeacher(
		$name: String!
		$surname: String!
		$subjectIds: [Int!]
	) {
		createTeacher(name: $name, surname: $surname, subjectIds: $subjectIds) {
			id
			name
			surname
		}
	}
`

export const GET_TEACHER = gql`
	query GetTeacher($id: Int!) {
		teacher(id: $id) {
			id
			name
			surname
			subjects {
				id
				name
				grade
			}
		}
	}
`

export const UPDATE_TEACHER = gql`
	mutation UpdateTeacher(
		$id: Int!
		$name: String
		$surname: String
		$subjectIds: [Int!]
	) {
		updateTeacher(
			id: $id
			name: $name
			surname: $surname
			subjectIds: $subjectIds
		) {
			id
			name
			surname
		}
	}
`

export const DELETE_TEACHER = gql`
	mutation DeleteTeacher($id: Int!) {
		deleteTeacher(id: $id) {
			id
		}
	}
`
