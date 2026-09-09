import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const salt = await bcrypt.genSalt(10)

export const register = async (req:Request, res:Response) => {
    const { name, password, email } = req.body

    // check if users exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res.status(400).json({error: "user already exists with this email"})
    }

    // hash password
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
        res.status(201).json({
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


export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body

    // validation
    const user = await prisma.user.findUnique({
        where: {email: email}
    })
    
    if (!user) {
        return res.status(401).json({ error: "wrong email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (!isPasswordValid) {
        return res.status(401).json({ error: "wrong email or password" })
    }

    // generate JWT token
    const token = generateToken(user.id, res)

    res.status(202).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    })
}

export const logout = (req:Request, res:Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(202).json({
        status: "success",
        message: "logged out successfully"
    })
}