import type { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { prismaClient } from "../application/db";
import { Code } from "../code/code";
import { ResponseError } from "../error/error";
import type { RegisterUserRequest, UserResponse } from "../model/user.model";
import { toUserResponse } from '../model/user.model';
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";

export class UserService {
	static async register(params: RegisterUserRequest): Promise<UserResponse> {
		let err: ResponseError | null
		[params, err] = await Validation.validate(UserValidation.REGISTER, params)
		if (err != null) {
			throw new ResponseError(err.code, err.message)
		}

		const isUsernameExists = await prismaClient.user.count({ where: { username: params.username } }) > 0
		if (isUsernameExists) {
			throw new ResponseError(Code.BAD_REQUEST, `username ${params.username} already exists`)
		}

		params.password = await bcrypt.hash(params.password, 10)

		const created: User = await prismaClient.user.create({ data: params })
		const result: UserResponse = toUserResponse(created)

		return result
	}
}