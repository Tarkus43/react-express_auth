import jwt, { SignOptions } from "jsonwebtoken"
import { User } from "../../generated/prisma/client"
import "dotenv/config"
import { Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

if (!JWT_SECRET) {throw new Error("JWT_SECRET is not defined in enviroment variables")}
if (!JWT_EXPIRES_IN) {throw new Error("JWT_EXPIRES_IN is not defined in enviroment variables")}

export const generateToken = (userId: User["id"], res: Response) => {
    const payload = {id: userId}
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"] || "4m"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: "strict",
        maxAge: (1000 * 60) * 5
    })
    return token

}



