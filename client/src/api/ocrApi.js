import axios from 'axios'

const API_URL = import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://aadhaar-ocr-system-9xhg.onrender.com/api"

export const extractAadhaarData = async (frontFile, backFile) =>{
    const formData = new FormData()

    formData.append("front", frontFile)
    formData.append("back", backFile)

    const response = await axios.post(`${API_URL}/ocr`,formData)
    return response.data
}
