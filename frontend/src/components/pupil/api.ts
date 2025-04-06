import { gql } from '@apollo/client'

export const GET_PUPILS = gql`
	query GetPupils($page: Int, $search: String, $grade: Int) {
		pupils(page: $page, search: $search, grade: $grade) {
			id
			name
			surname
			grade
		}
	}
`

export const CREATE_PUPIL = gql`
	mutation CreatePupil(
		$name: String!
		$surname: String!
		$grade: Int!
		$subjectIds: [Int!]!
	) {
		createPupil(
			name: $name
			surname: $surname
			grade: $grade
			subjectIds: $subjectIds
		) {
			id
			name
			surname
			grade
		}
	}
`

export const DELETE_PUPIL = gql`
	mutation DeletePupil($id: Int!) {
		deletePupil(id: $id) {
			id
		}
	}
`
