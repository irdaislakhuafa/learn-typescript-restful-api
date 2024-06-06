import type { User } from "@prisma/client";

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

export type LoginUserRequest = {
	username: string;
	password: string;
}

export function toUserResponse(user: User): UserResponse {
	return {
		name: user.name,
		username: user.username,
	}
}