import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { IGetUserAuthInfoRequest } from "./types/express/index.js";
interface MyJwtPayload {
  userId: string;
}
export function middleware(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"] ?? "";
  const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;
  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      messsage: "Unauthorized",
    });
  }
}
