import supertest from "supertest"
import { log } from "../../src/application/log"
import { web } from "../../src/application/web"
import { Code } from "../../src/code/code"
import { ResponseData } from "../../src/model/generic.model"
import { RegisterUserRequest } from "../../src/model/user.model"

describe("POST /api/v1/auth/register", () => {
	it("must return error if username already exists", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/register")
			.send({
				name: "irda islakhu afa",
				username: `irdaislakhuafa`,
				password: "12345678"
			} as RegisterUserRequest)

		log.debug(res.body)
		expect(res.status).toBe(Code.BAD_REQUEST)
		expect((res.body as ResponseData<any>).errors).toBeTruthy()
	})

	it("must return error if request invalid", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/register")
			.set({
				"x-request-id": "test_invalid_value"
			})
			.send({
				name: "",
				username: "",
				password: ""
			} as RegisterUserRequest)

		log.debug(res.body)
		expect(res.status).toBe(Code.BAD_REQUEST)
		expect((res.body as ResponseData<any>).errors).toBeTruthy()
	})
})