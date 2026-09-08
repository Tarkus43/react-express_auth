import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";

export const register = async (req:Request, res:Response) => {
    const { name, password, email } = req.body

    // check if users exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res
            .status(400)
            .json({
            error: "user already exists with this email"})
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // create user
    try {
        const user = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                email
            }
        })
        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        })        
    } catch (error) {
        res.status(500).json({
            error: `error creating user`,
            data: {
                error: error
            }
        })
    }
    
}