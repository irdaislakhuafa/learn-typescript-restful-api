import type { NextFunction, Response } from "express";
import { Code } from "../../utils/code/code";
import { ResponseError } from "../../utils/error/error";
import type { AuthRequest } from "../../utils/type/auth.request";
import { type ContactResponse, type CreateContactRequest } from "../model/contact.model";
import type { ResponseData } from "../model/generic.model";
import { ContactService } from "../service/contact.service";

export class ContactController {
	static async create(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			if (req.user) {
				const result = await ContactService.create(req.user, req.body as CreateContactRequest)
				const response: ResponseData<ContactResponse> = { data: result }
				res.status(Code.SUCCESS).json(response).end()
			} else { throw new ResponseError(Code.UNAUTHORIZED, "unauthorized") }
		} catch (e) { next(e) }
	}

	static async get(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			if (req.user) {
				const result = await ContactService.get(req.user, Number(req.params.contactID))
				const response: ResponseData<ContactResponse> = { data: result }
				res.status(Code.SUCCESS).json(response).end()
			} else { throw new ResponseError(Code.UNAUTHORIZED, "unauthorized") }
		} catch (e) { next(e) }
	}
} 