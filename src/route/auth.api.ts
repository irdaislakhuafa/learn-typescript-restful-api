import express from "express"
import { UserController } from "../business/controller/user.controller"
import { middlewareAuth } from "../middleware/auth"

export const authRoute = express.Router()
authRoute.use(middlewareAuth)
authRoute.get("/api/v1/users/current", UserController.getCurrent)
authRoute.patch("/api/v1/users/current", UserController.updateCurrent)
authRoute.delete("/api/v1/users/current", UserController.logoutCurrent)