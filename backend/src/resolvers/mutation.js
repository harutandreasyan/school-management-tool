// src/resolvers/mutation.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET 

export const Mutation = {
	login: async (_, { username, password }, { prisma }) => {
		const user = await prisma.user.findUnique({ where: { username } })
		if (!user) throw new Error('No such user')
		const valid = await bcrypt.compare(password, user.password)
		if (!valid) throw new Error('Invalid password')
		const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: '1d',
		})
		return { token, user }
	},
	createTeacher: async (_, { name, surname, subjectIds = [] }, { prisma }) => {
		return prisma.teacher.create({
			data: {
				name,
				surname,
				subjects:
					subjectIds.length > 0
						? { connect: subjectIds.map((id) => ({ id })) }
						: undefined,
			},
		})
	},
	updateTeacher: async (_, { id, name, surname, subjectIds }, { prisma }) => {
		const data = {}
		if (name !== undefined) data.name = name
		if (surname !== undefined) data.surname = surname
		if (subjectIds !== undefined)
			data.subjects = { set: subjectIds.map((id) => ({ id })) }
		return prisma.teacher.update({ where: { id }, data })
	},
	deleteTeacher: async (_, { id }, { prisma }) => {
		return prisma.teacher.delete({ where: { id } })
	},
	createSubject: async (_, { name, grade, teacherId }, { prisma }) => {
		return prisma.subject.create({ data: { name, grade, teacherId } })
	},
	updateSubject: async (_, { id, name, grade, teacherId }, { prisma }) => {
		const data = {}
		if (name !== undefined) data.name = name
		if (grade !== undefined) data.grade = grade
		if (teacherId !== undefined) data.teacherId = teacherId
		return prisma.subject.update({ where: { id }, data })
	},
	deleteSubject: async (_, { id }, { prisma }) => {
		return prisma.subject.delete({ where: { id } })
	},
	createPupil: async (_, { name, surname, grade, subjectIds }, { prisma }) => {
		const pupil = await prisma.pupil.create({ data: { name, surname, grade } })
		await prisma.pupil.update({
			where: { id: pupil.id },
			data: { subjects: { connect: subjectIds.map((id) => ({ id })) } },
		})
		return prisma.pupil.findUnique({
			where: { id: pupil.id },
			include: { subjects: true },
		})
	},
	updatePupil: async (
		_,
		{ id, name, surname, grade, subjectIds },
		{ prisma }
	) => {
		const data = {}
		if (name !== undefined) data.name = name
		if (surname !== undefined) data.surname = surname
		if (grade !== undefined) data.grade = grade
		if (subjectIds !== undefined)
			data.subjects = { set: subjectIds.map((id) => ({ id })) }
		return prisma.pupil.update({
			where: { id },
			data,
			include: { subjects: true },
		})
	},
	deletePupil: async (_, { id }, { prisma }) => {
		return prisma.pupil.delete({ where: { id } })
	},
}
