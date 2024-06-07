import type { User } from "@prisma/client";
import type { Request } from "express";

export interface AuthRequest extends Request {
	user?: User
} 