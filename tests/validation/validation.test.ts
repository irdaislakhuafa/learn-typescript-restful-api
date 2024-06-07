import { z } from "zod"
import { Validation } from "../../src/utils/validation/validation"

describe("validation", () => {
	const obj = z.object({
		email: z.string().email(),
	})

	type Obj = z.infer<typeof obj>

	it("must error", () => {
		const value: Obj = {
			email: "x"
		}

		const [res, err] = Validation.validate(obj, value)
		if (err != null) {
			expect(err).toBeTruthy()
			expect(err?.message).toBe("email: invalid email")
		}
	})

	it("must ok", () => {
		const value: Obj = {
			email: "i@gmail.com"
		}

		const [res, err] = Validation.validate(obj, value)
		if (err != null) {
			console.log(err.message)
		} else {
			expect(JSON.stringify(res)).toBe(JSON.stringify(value))
		}
	})
})