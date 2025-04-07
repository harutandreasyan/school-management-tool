export const Teacher = {
	subjects: async (parent, _, { prisma }) => {
		return prisma.subject.findMany({ where: { teacherId: parent.id } })
	},
}
