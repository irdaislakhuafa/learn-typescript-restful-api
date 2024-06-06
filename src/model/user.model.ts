import type { User } from "@prisma/client";
import type { z } from "zod";
import type { UserValidation } from "../validation/user.validation";

export type UserResponse = {
	username: string;
	name: string;
	token?: string;
}

export type RegisterUserRequest = z.infer<typeof UserValidation.REGISTER>

export function toUserResponse(user: User): UserResponse {
	return {
		name: user.name,
		username: user.username,
	}
}