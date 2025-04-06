// src/resolvers/query.js
export const Query = {
	me: async (_, __, { user, prisma }) => {
		if (!user) throw new Error('Not authenticated')
		return prisma.user.findUnique({ where: { id: user.id } })
	},
	teachers: async (_, { page = 1, search = '' }, { user, prisma }) => {
		if (!user || user.role !== 'ADMIN') throw new Error('Access denied')
		const take = 10
		return prisma.teacher.findMany({
			where: { name: { contains: search } },
			skip: (page - 1) * take,
			take,
			include: { subjects: true },
		})
	},
	teacher: async (_, { id }, { user, prisma }) => {
		if (!user || user.role !== 'ADMIN') throw new Error('Access denied')
		return prisma.teacher.findUnique({
			where: { id },
			include: { subjects: true },
		})
	},
	subjects: async (_, { page = 1, search = '' }, { user, prisma }) => {
		if (!user || user.role !== 'ADMIN') throw new Error('Access denied')
		const take = 10
		return prisma.subject.findMany({
			where: { name: { contains: search } },
			skip: (page - 1) * take,
			take,
			include: { teacher: true, pupils: true },
		})
	},
	pupils: async (_, { page = 1, search = '', grade }, { user, prisma }) => {
		if (!user || user.role !== 'ADMIN') throw new Error('Access denied')
		const take = 10
		const where = {
			name: { contains: search },
			...(grade !== undefined ? { grade: grade } : {}),
		}
		return prisma.pupil.findMany({
			where,
			skip: (page - 1) * take,
			take,
			include: { subjects: true },
		})
	},
}
