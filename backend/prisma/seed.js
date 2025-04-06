import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
	const adminPassword = await bcrypt.hash('adminpassword', 10)

	await prisma.user.upsert({
		where: { username: 'admin' },
		update: {},
		create: {
			username: 'admin',
			password: adminPassword,
			role: 'ADMIN',
		},
	})

	const teachersData = [
		{ name: 'Armine', surname: 'Simonyan' },
		{ name: 'Davit', surname: 'Karapetyan' },
		{ name: 'Ani', surname: 'Petrosyan' },
		{ name: 'Aram', surname: 'Manukyan' },
		{ name: 'Narek', surname: 'Hovhannisyan' },
		{ name: 'Suren', surname: 'Avetisyan' },
		{ name: 'Karine', surname: 'Sargsyan' },
		{ name: 'Levon', surname: 'Melkonyan' },
		{ name: 'Tigran', surname: 'Sargsyan' },
		{ name: 'Gayane', surname: 'Mkrtchyan' },
	]

	const createdTeachers = await Promise.all(
		teachersData.map((t) =>
			prisma.teacher.create({
				data: {
					name: t.name,
					surname: t.surname,
				},
			})
		)
	)

	const subjectsList = [
		'Mathematics',
		'Physics',
		'Chemistry',
		'Biology',
		'History',
		'Geography',
		'English',
		'Armenian',
		'Music',
		'Art',
	]

	const createdSubjects = await Promise.all(
		subjectsList.map((subjectName, index) => {
			const teacher = createdTeachers[index % createdTeachers.length]
			const grade = 5 + (index % 6)
			return prisma.subject.create({
				data: {
					name: subjectName,
					grade,
					teacher: { connect: { id: teacher.id } },
				},
			})
		})
	)

	const pupilFirstNames = [
		'Ani',
		'Lilit',
		'Mariam',
		'Siran',
		'Narine',
		'Hermine',
		'Varduhi',
		'Gohar',
		'Alvard',
		'Armenuhi',
	]

	const pupilSurnames = [
		'Simonyan',
		'Karapetyan',
		'Petrosyan',
		'Manukyan',
		'Hovhannisyan',
		'Avetisyan',
		'Sargsyan',
		'Melkonyan',
		'Mkrtchyan',
		'Vardanyan',
	]

	for (let grade = 5; grade <= 10; grade++) {
		for (let i = 0; i < 5; i++) {
			const firstName = pupilFirstNames[i % pupilFirstNames.length]
			const surname = pupilSurnames[i % pupilSurnames.length]
			await prisma.pupil.create({
				data: {
					name: firstName,
					surname: surname,
					grade,
				},
			})
		}
	}

	console.log('Seeding completed successfully.')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
