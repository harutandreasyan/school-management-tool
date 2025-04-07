export const Pupil = {
	subjects: async (parent, _, { prisma }) => {
		return prisma.subject.findMany({
			where: { pupils: { some: { id: parent.id } } },
		})
	},
}
