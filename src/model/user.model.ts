export type UserResponse = {
	username: string;
	name: string;
	token?: string;
}

export type RegisterUserRequest = {
	name: string;
	username: string;
	password: string;
}