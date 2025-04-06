import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
})

const HEADER = 'Bearer'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')
	
	return {
		headers: {
			...headers,
			authorization: token ? `${HEADER} ${token}` : '',
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

export default client
