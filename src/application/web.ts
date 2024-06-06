import express from "express";
import { middlewareError } from "../middleware/error";
import { publicRouter } from "../route/public.api";
export const web = express();
web.use(express.json())
web.use(publicRouter)
web.use(middlewareError)