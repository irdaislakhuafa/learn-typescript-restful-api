import type { User } from "@prisma/client";
import { pc } from "../../application/db";
import { Code } from "../../utils/code/code";
import { ResponseError } from "../../utils/error/error";
import { ContactValidation } from "../../utils/validation/contact.validation";
import { Validation } from "../../utils/validation/validation";
import { toContactResponse, type ContactResponse, type CreateContactRequest } from "../model/contact.model";

export class ContactService {
	static async create(owner: User, params: CreateContactRequest): Promise<ContactResponse> {
		const [filteredParam, err] = await Validation.validate(ContactValidation.CREATE, params)
		if (err) {
			throw new ResponseError(Code.BAD_REQUEST, err.message)
		}

		const created = await pc.contact.create({
			data: {
				...{ user_id: owner.id },
				...filteredParam
			}
		})


		const result = toContactResponse(created)
		return result
	}

	static async get(owner: User, contactID: number): Promise<ContactResponse> {
		const contact = await pc.contact.findUnique({
			where: {
				id: contactID,
				user_id: owner.id
			}
		})
		if (!contact) {
			throw new ResponseError(Code.NOT_FOUND, `contact with id ${contactID} in user ${owner.username} not found`)
		}

		const result = toContactResponse(contact)
		return result
	}
}