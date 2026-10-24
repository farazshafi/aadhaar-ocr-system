import extractAadhaar from 'aadhaar-image-to-text'

export const extractData = async (req, res) => {
    try {
        const front = req.files?.front?.[0]
        const back = req.files?.back?.[0]

        if (!front || !back) {
            return res.status(400).json({ message: "Both front and back required!", success: false })
        }

        const structuredData = await extractAadhaar({
            front: front.buffer,
            back: back.buffer,
        })

        return res.status(200).json({
            message: "Data extracted successfully!",
            success: true,
            data: structuredData
        })

    } catch (error) {
        console.error("OCR Process failed...", error.message)
        res.status(500).json({ message: "Failed to process image.", success: false })
    }
}
