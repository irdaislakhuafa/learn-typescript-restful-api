import { Contact, User } from "@prisma/client"
import bcrypt from "bcrypt"
import { pc } from "../src/application/db"

export class UserTest {
	static async delete() {
		const isExists = (await pc.user.count({ where: { username: "test" } })) > 0
		if (isExists) {
			await pc.user.delete({ where: { username: "test" } })
		}
	}

	static async create() {
		const isExists = (await pc.user.count({ where: { username: "test" } })) > 0
		if (!isExists) {
			await pc.user.create({
				data: {
					name: "test",
					username: "test",
					password: await bcrypt.hash("test", 10),
					token: "test"
				}
			})
		}
	}

	static async get(): Promise<User | null> {
		return await pc.user.findUnique({ where: { username: "test" } })
	}
}

export class ContactTest {
	static async delete() {
		await pc.contact.deleteMany({
			where: {
				user: {
					username: "test"
				}
			}
		})
	}

	static async getAll(): Promise<Contact[]> {
		return await pc.contact.findMany({
			where: {
				user: { username: "test" }
			}
		})
	}

	static async get(id: number): Promise<Contact | null> {
		return await pc.contact.findFirst({ where: { user: { username: "test" } } })
	}
}