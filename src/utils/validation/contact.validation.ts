import { z, type ZodType } from "zod";

export class ContactValidation {
	static readonly CREATE: ZodType = z.object({
		first_name: z.string(),
		last_name: z.string().min(1).max(255).optional(),
		email: z.string().email().optional(),
		phone: z.string().max(255),
	})
}