import { Request, Response } from "express";

export const fetchDog = async (req:Request, res:Response ) => {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random")
        if(!response) res.status(500).json({
            error: "failed fetching dog api"
        })

        const result = await response.json()

        res.json({
            status: "ok",
            data: {
                dogUrl: result
            }
        })
    } catch (error) {
        res.status(500).json({
            error,
            message: "error fetching dog api"
        })
    }
}