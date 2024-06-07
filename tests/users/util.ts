import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import { prismaClient } from "../../src/application/db"
export class UserUtil {
	static async delete() {
		const isExists = (await prismaClient.user.count({ where: { username: "test" } })) > 0
		if (isExists) {
			await prismaClient.user.delete({ where: { username: "test" } })
		}
	}

	static async create() {
		const isExists = (await prismaClient.user.count({ where: { username: "test" } })) > 0
		if (!isExists) {
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

	static async get(): Promise<User | null> {
		return await prismaClient.user.findUnique({ where: { username: "test" } })
	}
}