import type { NextFunction, Request, Response } from "express";
import { log } from "../application/log";
import type { ResponseData } from "../business/model/generic.model";
import { Code } from "../utils/code/code";
import { ResponseError } from "../utils/error/error";

export const middlewareError = async (err: Error, req: Request, res: Response, next: NextFunction) => {
	let response: ResponseData<any>;
	const l = log.child({
		request_id: req.headers["x-request-id"] || "N/A",
		path: req.path,
		method: req.method
	})

	l.info("requested")

	if (err) {
		if (err instanceof ResponseError) {
			l.error(`${err.file}:${err.line} -- ${err.message}`)
			response = { errors: err.message.split(", ") }
			res.status(err.code).json(response).end()
		} else {
			l.error(`${err.stack}`)
			response = { errors: [err.message] }
			res.status(Code.INTERNAL_SERVER_ERROR).json(response).end()
		}
	} else {
		l.error(res.json())
	}
}