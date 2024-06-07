import express from "express"
import { middlewareAuth } from "../middleware/auth"

export const authRoute = express.Router()
authRoute.use(middlewareAuth)