import type { Contact } from "@prisma/client";

export type ContactResponse = {
	id: number;
	first_name: string;
	last_name?: string | null;
	email?: string | null;
	phone: string
}

export type ContactCreateRequest = {
	first_name: string;
	last_name?: string;
	email?: string;
	phone: string;
}

export function toContactResponse(params: Contact): ContactResponse {
	return {
		id: params.id,
		first_name: params.first_name,
		phone: params.phone,
		email: params.email,
		last_name: params.last_name
	}
}