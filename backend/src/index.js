import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers/index.js'
import context from './context.js'

const app = express()
app.use(cors())

async function startServer() {
	const server = new ApolloServer({ typeDefs, resolvers, context })
	await server.start()
	server.applyMiddleware({ app, path: '/graphql' })

	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(
			`Server is running on http://localhost:${PORT}${server.graphqlPath}`
		)
	})
}

startServer()
