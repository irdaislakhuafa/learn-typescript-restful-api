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
		expect(err.message).toBe('bad req')
	})
	it("error with custom fmt caller msg", () => {
		const [_, err] = fn()
		const err2 = err.caller((e) => {
			e.message = `${e.file}:${e.line}`
			return e
		})

		expect(err2.code).toBe(Code.BAD_REQUEST)
		expect(err2.line).toBe("5")
		expect(err2.func).toBe('fn()')
		expect(err2.file).toBe(`${__filename}`)
		expect(err2.message).toBe(`${__filename}:5`)
	})

	it("error with caller msg", () => {
		const [_, err] = fn()
		const err2 = err.caller()
		console.table(err2)
		expect(err2.message).toBe(`${__filename}:5 -- bad req`)
	})
})