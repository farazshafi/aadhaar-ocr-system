// imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// config
dotenv.config()

// initalization
const app = express()
const PORT = process.env.PORT || 2000

// middleware
app.use(cors())
app.use(express.json())

// router

app.get("/",(req,res)=>{
    res.json({message: "Aadhaar OCR API is running"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT},`)
    console.log(`Server Api running at http://localhost:${PORT}`)
})