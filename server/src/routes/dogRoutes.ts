import express from "express"
import { fetchDog } from "../controllers/dogController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

export const dogRouter = express.Router()

dogRouter.use(authMiddleware)
dogRouter.get("/", fetchDog)