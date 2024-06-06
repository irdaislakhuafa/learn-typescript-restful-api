import type { ZodType } from "zod";
import { Code } from "../code/code";
import { ResponseError } from "../error/error";

export class Validation {
	static validate<T>(validate: ZodType, request: T): [T, ResponseError | null] {
		const result = validate.safeParse(request)
		if (!result.success) {
			const errs = result.error?.errors
			const msg = errs.map((e): string => `${e.path.join(".")}: ${e.message.toLowerCase()}`).join(", ")
			return [request, new ResponseError(Code.BAD_REQUEST, msg)]
		}

		return [result.data, null]
	}
}