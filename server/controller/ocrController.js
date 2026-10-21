import tesseract from 'tesseract.js'

export const extractData = async (req, res) => {
    try {
        const front = req.files?.front?.[0]
        const back = req.files?.back?.[0]

        if (!front || !back) {
            return res.status(400).json({ message: "Both front and back required!", success: false })
        }

        const [frontResult, backResult] = await Promise.all([
            tesseract.recognize(front.buffer, "eng"),
            tesseract.recognize(back.buffer, "eng")
        ])

        return res.status(200).json({
            message: "Data extracted successfully!",
            success: true,
            data:{
                frontText: frontResult.data.text,
                backText: backResult.data.text
            }
        })

    } catch (error) {
        console.error("OCR Process failed...", error.message)
        res.status(500).json({ message: "Failed to process image.", success: false })
    }
}