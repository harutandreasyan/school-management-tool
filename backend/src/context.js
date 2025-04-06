import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey'

const context = ({ req }) => {
	const token = req.headers.authorization || ''
	let user = null
	if (token) {
		try {
			user = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
		} catch (e) {
			console.error('Invalid token')
		}
	}

	return { user, prisma }
}

export default context
