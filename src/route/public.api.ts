import express from "express";
import { UserController } from "../business/controller/user.controller";

export const publicRouter = express.Router({
	strict: true,
	caseSensitive: true
})

publicRouter.post("/api/v1/auth/register", UserController.register)