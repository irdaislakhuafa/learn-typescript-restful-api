import type { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../../application/db";
import { Code } from "../../utils/code/code";
import { ResponseError } from "../../utils/error/error";
import { UserValidation } from "../../utils/validation/user.validation";
import { Validation } from "../../utils/validation/validation";
import type { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { toUserResponse } from '../model/user.model';

export class UserService {
	static async register(params: RegisterUserRequest): Promise<UserResponse> {
		const [filteredParam, err] = await Validation.validate(UserValidation.REGISTER, params)
		if (err != null) {
			throw new ResponseError(err.code, err.message)
		}

		const isUsernameExists = await prismaClient.user.count({ where: { username: filteredParam.username } }) > 0
		if (isUsernameExists) {
			throw new ResponseError(Code.BAD_REQUEST, `username ${filteredParam.username} already exists`)
		}

		filteredParam.password = await bcrypt.hash(filteredParam.password, 10)

		const created: User = await prismaClient.user.create({ data: filteredParam })
		const result: UserResponse = toUserResponse(created)

		return result
	}

	static async login(params: LoginUserRequest): Promise<UserResponse> {
		const [filteredParam, err] = await Validation.validate(UserValidation.LOGIN, params)
		if (err != null) {
			throw new ResponseError(err.code, err.message)
		}

		const user: User | null = await prismaClient.user.findUnique({ where: { username: filteredParam.username } })
		if (!user) {
			throw new ResponseError(Code.UNAUTHORIZED, `username '${filteredParam.username}' not found`)
		}

		const isPwdMatch = await bcrypt.compare(filteredParam.password, user.password)
		if (!isPwdMatch) {
			throw new ResponseError(Code.UNAUTHORIZED, `username or password is wrong`)
		}

		const updated: User | null = await prismaClient.user.update({
			where: { username: filteredParam.username },
			data: { token: uuidv4() }
		}).catch((err) => {
			throw new ResponseError(Code.UNAUTHORIZED, `failed while generate token, ${err}`)
		})

		if (!updated) {
			throw new ResponseError(Code.UNAUTHORIZED, `failed while generate token`)
		}

		const result = toUserResponse(updated)
		result.token = updated.token!
		return result
	}

	static async getCurrent(params: User): Promise<UserResponse> {
		return toUserResponse(params)
	}

	static async updateCurrent(current: User, params: UpdateUserRequest): Promise<UserResponse> {
		const [filteredParam, err] = await Validation.validate(UserValidation.UPDATE_CURRENT, params)
		if (err) {
			throw new ResponseError(Code.BAD_REQUEST, err.message)
		}

		current.name = filteredParam.name ? filteredParam.name : current.name
		current.password = filteredParam.password ? await bcrypt.hash(filteredParam.password, 10) : current.password

		const updated = await prismaClient.user.update({
			where: { id: current.id },
			data: current
		})

		const result = toUserResponse(updated)
		return result
	}
}