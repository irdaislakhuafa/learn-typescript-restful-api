import { PrismaClient } from "@prisma/client/extension";
import { log } from "./log";

export const prismaClient: PrismaClient = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query"
		},
		{
			emit: "event",
			level: "info"
		},
		{
			emit: "event",
			level: "warn"
		},
		{
			emit: "event",
			level: "error"
		}
	]
});

prismaClient.$on("query", async (e: any) => log.debug(e));
prismaClient.$on("info", async (e: any) => log.info(e));
prismaClient.$on("warn", async (e: any) => log.warn(e));
prismaClient.$on("error", async (e: any) => log.error(e));