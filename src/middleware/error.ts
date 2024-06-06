import type { NextFunction, Request, Response } from "express";
import { log } from "../application/log";
import { Code } from "../code/code";
import { ResponseError } from "../error/error";
import type { ResponseData } from "../model/generic.model";

export const middlewareError = async (err: Error, req: Request, res: Response, next: NextFunction) => {
	let response: ResponseData<any>;
	if (err instanceof ResponseError) {
		log.error(`${err.file}:${err.line} -- ${err.message}`)
		response = { errors: [err.message] }
		res.status(err.code).json(response)
	} else {
		log.error(`${err.stack}`)
		response = { errors: [err.message] }
		res.status(Code.INTERNAL_SERVER_ERROR).json(response)
	}
}