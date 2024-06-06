import express from "express";
import { middleware } from "../middleware/middleware";
import { publicRouter } from "../route/public.api";

export const web = express();
web.use(express.json())
web.use(publicRouter)
web.use(middleware)