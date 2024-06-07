import { log } from "./src/application/log";
import { web } from "./src/application/web";
const port = Bun.env.APP_PORT || "3000"

log.info(`server listening at port ${port}`)
web.listen(Number(port))