import { PrismaClient } from "@prisma/client";
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
prismaClient.$on("query" as never, (e: any) => log.debug(e));
prismaClient.$on("info" as never, (e: any) => log.info(e));
prismaClient.$on("warn" as never, (e: any) => log.warn(e));
prismaClient.$on("error" as never, (e: any) => log.error(e));