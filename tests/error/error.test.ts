import { Code } from "../../src/utils/code/code"
import { ResponseError } from "../../src/utils/error/error"

const fn = (): [any | null, ResponseError] => {
	const err = new ResponseError(Code.BAD_REQUEST, "bad req")
	return [null, err]
}

describe("error", () => {
	it("error with caller info", () => {
		const [_, err] = fn()
		expect(err.code).toBe(Code.BAD_REQUEST)
		expect(err.line).toBe("5")
		expect(err.func).toBe('fn()')
		expect(err.file).toBe(`${__filename}`)
	})
})