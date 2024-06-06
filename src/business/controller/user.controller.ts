import type { NextFunction, Request, Response } from "express";
import { Code } from "../../utils/code/code";
import type { ResponseData } from "../model/generic.model";
import type { LoginUserRequest, RegisterUserRequest, UserResponse } from "../model/user.model";
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
}