import supertest from "supertest"
import { log } from "../../src/application/log"
import { web } from "../../src/application/web"
import { ResponseData } from "../../src/business/model/generic.model"
import { RegisterUserRequest, UserResponse } from "../../src/business/model/user.model"
import { Code } from "../../src/utils/code/code"
import { UserUtil } from "./util.test"

describe("POST /api/v1/auth/register", () => {
	beforeEach(UserUtil.create)
	afterEach(UserUtil.delete)

	it("must return error if username already exists", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/register")
			.send({
				name: "test",
				username: `test`,
				password: "test"
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

	it("must success", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/register")
			.send({
				name: "test",
				username: "test",
				password: "test"
			} as RegisterUserRequest)

		const body = (res.body as ResponseData<UserResponse>)
		log.debug(res.body)
		expect(res.status).toBe(Code.SUCCESS)
		expect(body.errors).toBeFalsy()
		expect(body.data?.name).toBe("irda islakhu afa")
		expect(body.data?.username).toBe("test")
	})
})