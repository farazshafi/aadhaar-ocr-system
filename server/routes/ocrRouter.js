import { Router } from "express"
import multer from "multer"
import { extractData } from '../controller/ocrController.js'

export const router = Router()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
            cb(null, true)
        } else {
            const error = new Error("Only JPG, PNG and WEBP images are allowed.")
            error.status = 400
            error.code = "INVALID_FILE_TYPE"
            cb(error)
        }
    },
})

router.post("/", upload.fields([{ name: "front", maxCount: 1 }, { name: "back", maxCount: 1 }]), extractData)
