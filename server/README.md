# Backend API

Express service that accepts Aadhaar card images, runs OCR with Tesseract.js, and extracts structured fields. The service is hosted on Render.

## Local setup

```sh
npm install
```

The server defaults to port 2000, but the frontend's development API URL points to port 5000. Set `PORT=5000` when running locally to connect the two:

```powershell
$env:PORT=5000; npm run dev
```

On macOS/Linux, use `PORT=5000 npm run dev`. To run with the server's default port instead, use `npm run dev` and account for the frontend URL in your local setup.

The server starts at `/` and reports that the API is running. The OCR endpoint is `POST /api/ocr`.

## Request format

Send `multipart/form-data` with both `front` and `back` file fields. Each file must be JPG, PNG, or WEBP, no larger than 5 MB. The response includes extracted name, date of birth, gender, Aadhaar number, address, and the OCR text for both sides.

## Testing

Run the existing field extraction test from this directory:

```sh
node utils/extractAadhaar.test.js
```

The test uses representative OCR results; it does not call the HTTP endpoint or validate OCR accuracy on real card images. `package.json` does not currently define a server test script.

## Render deployment

Configure the Render Web Service with root directory `server`, build command `npm install`, and start command `npm start`. Render provides the `PORT` variable automatically. Keep `eng.traineddata` in the server directory; it is included in this repository for the OCR engine. The frontend's production API base URL is currently `https://aadhaar-ocr-system-9xhg.onrender.com/api`.

See the [root README](../README.md) for full project documentation.
