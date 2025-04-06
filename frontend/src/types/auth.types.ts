export interface User {
	id: number
	username: string
	role: string
}

export interface LoginResponse {
	token: string
	user: User
}

export interface LoginMutationResponse {
	login: LoginResponse
}

export interface LoginMutationVariables {
	username: string
	password: string
}
