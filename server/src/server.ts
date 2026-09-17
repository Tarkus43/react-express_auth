// imports
import express from 'express'
import { config } from 'dotenv'
// route imports
import { authRouter } from "./routes/authRoutes.js"
import { dogRouter } from './routes/dogRoutes.js'
import cors from "cors"

config()

const app = express()

// CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

// body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/auth", authRouter)
app.use("/dog", dogRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` )
})



