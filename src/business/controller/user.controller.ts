import type { NextFunction, Request, Response } from "express";
import { log } from "../../application/log";
import { Code } from "../../utils/code/code";
import { ResponseError } from "../../utils/error/error";
import type { AuthRequest } from "../../utils/type/auth.request";
import type { ResponseData } from "../model/generic.model";
import type { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { UserService } from "../service/user.service";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await UserService.register(req.body as RegisterUserRequest)
			const response: ResponseData<UserResponse> = { data: result }
			res.status(Code.SUCCESS).json(response)
		} catch (err) { next(err) }
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await UserService.login(req.body as LoginUserRequest)
			const response: ResponseData<UserResponse> = { data: result }
			res.status(Code.SUCCESS).json(response)
		} catch (err) { next(err) }
	}

	static async getCurrent(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			if (req.user) {
				const result = await UserService.getCurrent(req.user)
				const response: ResponseData<UserResponse> = { data: result }
				log.debug(response)
				res.status(Code.SUCCESS).json(response).end()
			} else { throw new ResponseError(Code.UNAUTHORIZED, "unauthorized") }
		} catch (e) { next(e) }
	}

	static async updateCurrent(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			if (req.user) {
				const result = await UserService.updateCurrent(req.user, req.body as UpdateUserRequest)
				const response: ResponseData<UserResponse> = { data: result }
				res.status(Code.SUCCESS).json(response).end()
			} else { throw new ResponseError(Code.UNAUTHORIZED, "unauthorized") }
		} catch (e) { next(e) }
	}
}