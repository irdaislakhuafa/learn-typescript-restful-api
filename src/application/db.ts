import { PrismaClient } from "@prisma/client";
import { log } from "./log";

export const pc: PrismaClient = new PrismaClient({
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
pc.$on("query" as never, (e: any) => log.debug(e));
pc.$on("info" as never, (e: any) => log.info(e));
pc.$on("warn" as never, (e: any) => log.warn(e));
pc.$on("error" as never, (e: any) => log.error(e));