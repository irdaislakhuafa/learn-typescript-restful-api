import bcrypt from "bcrypt"
import { prismaClient } from "../../src/application/db"
export class UserUtil {
	static async delete() {
		await prismaClient.user.delete({ where: { username: "test" } })
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				name: "test",
				username: "test",
				password: await bcrypt.hash("test", 10),
				token: "test"
			}
		})
	}
}