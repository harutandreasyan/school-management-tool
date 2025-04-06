// src/resolvers/subject.js
export const Subject = {
	teacher: async (parent, _, { prisma }) => {
		return prisma.teacher.findUnique({ where: { id: parent.teacherId } })
	},
	pupils: async (parent, _, { prisma }) => {
		return prisma.pupil.findMany({
			where: { subjects: { some: { id: parent.id } } },
		})
	},
}
