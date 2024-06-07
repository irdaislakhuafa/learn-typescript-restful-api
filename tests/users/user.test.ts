import supertest from "supertest"
import { validate } from "uuid"
import { log } from "../../src/application/log"
import { web } from "../../src/application/web"
import { ResponseData } from "../../src/business/model/generic.model"
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../../src/business/model/user.model"
import { Code } from "../../src/utils/code/code"
import { Constant } from "../../src/utils/constant/constant"
import { UserUtil } from "./util"

describe("POST /api/v1/auth/register", () => {
	it("must return error if username already exists", async () => {
		await UserUtil.create()
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
		await UserUtil.delete()
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
		await UserUtil.delete()
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
		expect(body.data).toBeTruthy()
		expect(body.data?.name).toBe("test")
		expect(body.data?.username).toBe("test")
	})
})

describe("POST /api/v1/auth/login", () => {
	afterEach(UserUtil.delete)
	beforeEach(UserUtil.create)

	it("login must success", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/login")
			.send({
				username: "test",
				password: "test"
			} as LoginUserRequest)

		const body = (res.body as ResponseData<UserResponse>)

		expect(res.status).toBe(Code.SUCCESS)
		expect(body.data).toBeTruthy()
		expect(body.data?.name).toBe("test")
		expect(body.data?.username).toBe("test")
		expect(body.data?.token).toBeDefined()
		expect(validate(body.data?.token!)).toBe(true)
	})

	it("login rejected coz username is wrong", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/login")
			.send({
				username: "wrong",
				password: "test"
			} as LoginUserRequest)

		const body = (res.body as ResponseData<UserResponse>)

		expect(res.status).toBe(Code.UNAUTHORIZED)
		expect(body.data).toBeFalsy()
		expect(body.errors).toBeTruthy()
		expect(body.errors?.join(", ").includes("username")).toBeTruthy()
	})
	it("login rejected coz pwd is wrong", async () => {
		const res = await supertest(web)
			.post("/api/v1/auth/login")
			.send({
				username: "test",
				password: "wrong"
			} as LoginUserRequest)

		const body = (res.body as ResponseData<UserResponse>)

		expect(res.status).toBe(Code.UNAUTHORIZED)
		expect(body.data).toBeFalsy()
		expect(body.errors).toBeTruthy()
		expect(body.errors?.join(", ").includes("password")).toBeTruthy()
	})
})

describe("GET /api/v1/users/current", () => {
	beforeEach(UserUtil.create)
	afterEach(UserUtil.delete)
	const url = "/api/v1/users/current"

	it("get current user must success", async () => {
		const res = await supertest(web)
			.get(url)
			.set(Constant.X_API_TOKEN, "test")

		const body = (res.body as ResponseData<UserResponse>)
		expect(res.status).toBe(Code.SUCCESS)
		expect(body.errors).toBeUndefined()
		expect(body.data).toBeDefined()
		expect(body.data?.name).toBe("test")
		expect(body.data?.username).toBe("test")
	})

	it("get current user unauthorized if token invalid", async () => {
		const res = await supertest(web)
			.get(url)
			.set(Constant.X_API_TOKEN, "wrong")

		const body = (res.body as ResponseData<UserResponse>)
		expect(res.status).toBe(Code.UNAUTHORIZED)
		expect(body.errors).toBeDefined()
		expect(body.errors?.join(", ").includes("unauthorized")).toBeTruthy()
	})
})