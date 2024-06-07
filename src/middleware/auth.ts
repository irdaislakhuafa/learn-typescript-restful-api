import type { NextFunction, Response } from "express";
import { prismaClient } from "../application/db";
import type { ResponseData } from "../business/model/generic.model";
import { Code } from "../utils/code/code";
import { Constant } from "../utils/constant/constant";
import type { AuthRequest } from "../utils/type/auth.request";

export const middlewareAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.get(Constant.X_API_TOKEN);
	if (token) {
		const user = await prismaClient.user.findFirst({ where: { token } })
		if (user) {
			req.user = user
			next()
			return
		}
	}

	res.status(Code.UNAUTHORIZED).json({
		errors: ["unauthorized"]
	} as ResponseData<any>).end()
}