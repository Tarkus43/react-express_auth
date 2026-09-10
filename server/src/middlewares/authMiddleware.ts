import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../lib/prisma"
import { Request, Response, NextFunction } from "express"
import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {throw new Error("JWT_SECRET is not defined in enviroment variables")}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined
    
    // getting token from request
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.jwt){
        token = req.cookies.jwt
    }

    // checking if token even there
    if (!token) {
        return res.status(401).json({
            error: "didnt authorized, try to login first"
        })
    }


    try {
        const decoded = await jwt.verify(token, JWT_SECRET)
        if (typeof decoded === "string") {
            return res.status(500).json({
                error: "wrong payload used while generating token"
            })
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        })
        if (!user){
            return res.status(401).json({
                error: "such user doesnt exist"
            })
        }

    } catch (error) {
        return res.status(401).json({
            error: "not authorized, should login"
        })
    }
    next()
}