import supertest from "supertest"
import { web } from "../src/application/web"
import { ContactResponse, CreateContactRequest } from "../src/business/model/contact.model"
import { ResponseData } from "../src/business/model/generic.model"
import { Code } from "../src/utils/code/code"
import { Constant } from "../src/utils/constant/constant"
import { ContactTest, UserTest } from "./util"

describe("POST /api/v1/contacts", () => {
	beforeEach(UserTest.create)
	afterEach(ContactTest.delete)
	afterEach(UserTest.delete)
	const url = "/api/v1/contacts"

	it("test must create new contact", async () => {
		const user = await UserTest.get()
		expect(user).toBeTruthy()


		const res = await supertest(web)
			.post(url)
			.set(Constant.X_API_TOKEN, "test")
			.send({
				first_name: "test",
				last_name: "test",
				phone: "111111111111",
				email: "i@gmail.com"
			} as CreateContactRequest)

		const body = (res.body as ResponseData<ContactResponse>)
		expect(res.status).toBe(Code.SUCCESS)
		expect(body.data).toBeDefined()
		expect(body.data?.first_name).toBe("test")
		expect(body.data?.last_name).toBe("test")
		expect(body.data?.email).toBe("i@gmail.com")
		expect(body.data?.phone).toBe("111111111111")
		expect(body.data?.id).toBeDefined()

		if (body.data?.id) {
			const contact = await ContactTest.get(body.data?.id)
			expect(contact?.user_id).toBe(user?.id)
		}

	})

	it("test must rejected if create new contact coz invalid value", async () => {
		const user = await UserTest.get()
		expect(user).toBeTruthy()


		const res = await supertest(web)
			.post(url)
			.set(Constant.X_API_TOKEN, "test")
			.send({
				first_name: "",
				phone: "",
			} as CreateContactRequest)

		const body = (res.body as ResponseData<ContactResponse>)
		expect(res.status).toBe(Code.BAD_REQUEST)
		expect(body.data).toBeUndefined()
		expect(body.errors).toBeDefined()
		expect(body.errors?.join(", ").includes("first_name")).toBeTruthy()
		expect(body.errors?.join(", ").includes("phone")).toBeTruthy()
	})
})