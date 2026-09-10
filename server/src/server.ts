// imports
import express from 'express'
import { config } from 'dotenv'
// route imports
import { authRouter } from "./routes/authRoutes.js"
import { dogRouter } from './routes/dogRoutes.js'

config()

const app = express()

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



