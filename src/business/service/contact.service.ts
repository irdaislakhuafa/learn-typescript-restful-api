import type { User } from "@prisma/client";
import { prismaClient } from "../../application/db";
import { Code } from "../../utils/code/code";
import { ResponseError } from "../../utils/error/error";
import { ContactValidation } from "../../utils/validation/contact.validation";
import { Validation } from "../../utils/validation/validation";
import { toContactResponse, type ContactResponse, type CreateContactRequest } from "../model/contact.model";

export class ContactService {
	static async create(currentUser: User, params: CreateContactRequest): Promise<ContactResponse> {
		const [filteredParam, err] = await Validation.validate(ContactValidation.CREATE, params)
		if (err) {
			throw new ResponseError(Code.BAD_REQUEST, err.message)
		}

		const created = await prismaClient.contact.create({
			data: {
				...{ user_id: currentUser.id },
				...params
			}
		})


		const result = toContactResponse(created)
		return result
	}
}