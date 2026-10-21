import tesseract from 'tesseract.js'
import sharp from 'sharp'
import extractFromAdhaar from '../utils/extractAadhaar.js'

async function extractAadhaarNumberFromImage(imageBuffer) {
    const metadata = await sharp(imageBuffer).metadata()

    if (!metadata.width || !metadata.height) return null

    // The Aadhaar number is printed near the bottom of the card.
    const left = Math.floor(metadata.width * 0.25)
    const top = Math.floor(metadata.height * 0.78)
    const width = Math.floor(metadata.width * 0.55)
    const height = Math.floor(metadata.height * 0.17)

    const numberRegion = await sharp(imageBuffer)
        .extract({
            left,
            top,
            width: Math.min(width, metadata.width - left),
            height: Math.min(height, metadata.height - top),
        })
        .grayscale()
        .normalize()
        .resize({ width: 1200 })
        .png()
        .toBuffer()

    const result = await tesseract.recognize(numberRegion, 'eng', {
        logger: () => {},
    })

    const digits = (result.data.text.match(/\d/g) || []).join('')
    return digits.length === 12 ? digits : null
}

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

        const croppedAadhaarNumber =
            (await extractAadhaarNumberFromImage(front.buffer)) ||
            (await extractAadhaarNumberFromImage(back.buffer))

        // Debug: confirm what Tesseract returned
        console.log("[OCR] Front keys:", Object.keys(frontResult.data));
        console.log("[OCR] Front blocks:", frontResult.data.blocks?.length ?? 0);
        console.log("[OCR] Back blocks:", backResult.data.blocks?.length ?? 0);

        // Pass the full data objects so extractAadhaar can use .text AND .blocks
        const structuredData = extractFromAdhaar(frontResult.data, backResult.data)
        // Keep the full-image OCR result when the number crop misses or clips it.
        structuredData.aadhaarNumber = croppedAadhaarNumber || structuredData.aadhaarNumber

        // Debug: log field extraction results (mask Aadhaar number)
        const { name, dateOfBirth, gender, address } = structuredData
        console.log("[Extract] name:", name ?? "NOT FOUND")
        console.log("[Extract] dateOfBirth:", dateOfBirth ?? "NOT FOUND")
        console.log("[Extract] gender:", gender ?? "NOT FOUND")
        console.log("[Extract] aadhaarNumber:", structuredData.aadhaarNumber ? `****${structuredData.aadhaarNumber.slice(-4)}` : "NOT FOUND")
        console.log("[Extract] address:", address ? `${address.slice(0, 30)}…` : "NOT FOUND")

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
