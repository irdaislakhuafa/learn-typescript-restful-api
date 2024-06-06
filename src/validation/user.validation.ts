import { z, type ZodType } from "zod";

export class UserValidation {
	static readonly REGISTER: ZodType = z.object({
		name: z.string().min(1).max(155),
		username: z.string().min(1).max(255),
		password: z.string().min(1).max(155),
	})
}