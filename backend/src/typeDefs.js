import { gql } from 'apollo-server-express'

const typeDefs = gql`
	enum Role {
		ADMIN
		TEACHER
		PUPIL
	}

	type User {
		id: Int!
		username: String!
		role: Role!
	}

	type Teacher {
		id: Int!
		name: String!
		surname: String!
		subjects: [Subject!]!
	}

	type Subject {
		id: Int!
		name: String!
		grade: Int!
		teacher: Teacher!
		pupils: [Pupil!]!
	}

	type Pupil {
		id: Int!
		name: String!
		surname: String!
		grade: Int!
		subjects: [Subject!]!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		me: User
		teachers(page: Int, search: String): [Teacher!]!
		teacher(id: Int!): Teacher
		subjects(page: Int, search: String): [Subject!]!
		pupils(page: Int, search: String, grade: Int): [Pupil!]!
	}

	type Mutation {
		login(username: String!, password: String!): AuthPayload!

		createTeacher(name: String!, surname: String!, subjectIds: [Int!]): Teacher!
		updateTeacher(
			id: Int!
			name: String
			surname: String
			subjectIds: [Int!]
		): Teacher!
		deleteTeacher(id: Int!): Teacher!

		createSubject(name: String!, grade: Int!, teacherId: Int!): Subject!
		updateSubject(id: Int!, name: String, grade: Int, teacherId: Int): Subject!
		deleteSubject(id: Int!): Subject!

		createPupil(
			name: String!
			surname: String!
			grade: Int!
			subjectIds: [Int!]!
		): Pupil!

		updatePupil(
			id: Int!
			name: String
			surname: String
			grade: Int
			subjectIds: [Int!]
		): Pupil!
		deletePupil(id: Int!): Pupil!
	}
`

export default typeDefs
