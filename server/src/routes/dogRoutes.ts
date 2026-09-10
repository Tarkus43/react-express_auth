import express from "express"
import { fetchDog } from "../controllers/dogController.js"

export const dogRouter = express.Router()

dogRouter.get("/", fetchDog)