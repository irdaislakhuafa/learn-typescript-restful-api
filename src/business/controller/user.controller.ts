import type { NextFunction, Request, Response } from "express";
import { Code } from "../../utils/code/code";
import type { ResponseData } from "../model/generic.model";
import type { RegisterUserRequest, UserResponse } from "../model/user.model";
import { UserService } from "../service/user.service";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request = req.body as RegisterUserRequest
			const result = await UserService.register(request)
			const response: ResponseData<UserResponse> = { data: result }
			res.status(Code.SUCCESS).json(response)
		} catch (e) { next(e) }
	}
}