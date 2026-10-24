import multer from 'multer'

export const errorHandling = ((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    if (error instanceof multer.MulterError) {
        const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Image file must be 5 MB or smaller."
            : error.message

        return res.status(status).json({ message, success: false })
    }

    if (error.code === "INVALID_FILE_TYPE" || error.status === 400) {
        return res.status(400).json({ message: error.message, success: false })
    }

    console.error("Request failed...", error)
    return res.status(error.status || 500).json({
        message: error.status >= 400 && error.status < 500
            ? error.message
            : "An unexpected error occurred.",
        success: false,
    })
})