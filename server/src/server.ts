// imports
import express from 'express'
import { config } from 'dotenv'

// route imports

config()

const app = express()

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` )
})



