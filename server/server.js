// imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { router } from "./routes/ocrRouter.js"
import {errorHandling} from './middleware/errorHandling.js'

// config
dotenv.config()

// initalization
const app = express()
const PORT = process.env.PORT || 2000

// middleware
app.use(cors())
app.use(express.json())

// router
app.use("/api/ocr", router)

app.get("/", (req, res) => {
    res.json({ message: "Aadhaar OCR API is running" })
})

// Handle errors from route middleware (including Multer) in one place.
app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT},`)
    console.log(`Server Api running at http://localhost:${PORT}`)
})
