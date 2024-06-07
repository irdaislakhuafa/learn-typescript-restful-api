import express from "express";
import { middlewareError } from "../middleware/error";
import { authRoute } from "../route/auth.api";
import { publicRouter } from "../route/public.api";

export const web = express();
web.use(express.json())
web.use(publicRouter)
web.use(authRoute)
web.use(middlewareError)