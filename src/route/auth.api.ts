import express from "express"
import { ContactController } from "../business/controller/contact.controller"
import { UserController } from "../business/controller/user.controller"
import { middlewareAuth } from "../middleware/auth"

export const authRoute = express.Router()
authRoute.use(middlewareAuth)


authRoute.get("/api/v1/users/current", UserController.getCurrent)
authRoute.patch("/api/v1/users/current", UserController.updateCurrent)
authRoute.delete("/api/v1/users/current", UserController.logoutCurrent)

authRoute.post("/api/v1/contacts", ContactController.create)