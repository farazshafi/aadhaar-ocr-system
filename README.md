# Aadhaar OCR System

A web app that accepts images of both sides of an Aadhaar card and uses Tesseract.js OCR to extract fields such as name, date of birth, gender, Aadhaar number, and address.

- **Live frontend:** [aadhaar-image-to-text.vercel.app](https://aadhaar-image-to-text.vercel.app/)
- **Hosting:** React/Vite frontend on Vercel; Express API on Render.
- **Repository layout:** `client/` contains the frontend and `server/` contains the API and OCR logic.

## Requirements

- Node.js 20 or later and npm.
- Internet access the first time the OCR engine runs if Tesseract.js needs to fetch language data. The server also includes `server/eng.traineddata`.

## Local setup

Install dependencies in each app folder:

```sh
cd server
npm install
```

In another terminal:

```sh
cd client
npm install
```

Start the API on port **5000**. The frontend's development API URL is currently `http://localhost:5000/api`.

```sh
# from server/
$env:PORT=5000; npm run dev   # PowerShell
# PORT=5000 npm run dev       # macOS/Linux
```

Start the Vite development server in the other terminal:

```sh
# from client/
npm run dev
```

Open the local URL printed by Vite. Upload JPG, PNG, or WEBP images for both the front and back of the card, then select **Proceed**. The API accepts images up to 5 MB each.

## Configuration

The API reads `PORT` from the environment and defaults to `2000`. For local development, set it to `5000` to match the frontend's current development URL. The frontend uses the deployed Render API URL for production builds: `https://aadhaar-ocr-system-9xhg.onrender.com/api`.

The server loads a `.env` file through dotenv if present. No credentials are required by the current implementation. Do not commit `.env` files.

## Tests and checks

Run the OCR field extraction tests from `server/`:

```sh
node utils/extractAadhaar.test.js
```

The test script exits with a nonzero status if an assertion fails. It covers common field extraction cases using sample OCR text and structures; it does not exercise image upload, Tesseract recognition, or the live API.

Run the frontend lint check from `client/`:

```sh
npm run lint
```

Create a production frontend build and optionally serve it locally:

```sh
npm run build
npm run preview
```

There is no configured automated server test script in `server/package.json`; use the direct Node command above for the existing extraction test.

## Deployment

### Frontend — Vercel

Connect the repository to Vercel and configure the project with:

| Setting | Value |
| --- | --- |
| Root directory | `client` |
| Framework preset | Vite (or Other) |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

The production API URL is currently configured in `client/src/api/ocrApi.js`. If the Render service URL changes, update that URL and redeploy the frontend. The deployed site is [aadhaar-image-to-text.vercel.app](https://aadhaar-image-to-text.vercel.app/).

### Backend — Render

Create a Render Web Service from the same repository and configure:

| Setting | Value |
| --- | --- |
| Root directory | `server` |
| Runtime | Node |
| Build command | `npm install` |
| Start command | `npm start` |

Render supplies the `PORT` environment variable; the API listens on it. Confirm deployment by opening the service's root URL, which should return `{"message":"Aadhaar OCR API is running"}`. The frontend calls `POST /api/ocr` on the deployed API.

## API

`POST /api/ocr` accepts `multipart/form-data` with two image parts:

| Field | Required | Accepted formats |
| --- | --- | --- |
| `front` | Yes | JPG, PNG, WEBP |
| `back` | Yes | JPG, PNG, WEBP |

Each image must be 5 MB or smaller. A successful response contains `success: true` and a `data` object with `name`, `dateOfBirth`, `gender`, `aadhaarNumber`, `address`, and OCR `rawText`. Errors return a message and `success: false`.

## Project files

- `client/src/components/` — upload and results UI.
- `client/src/api/ocrApi.js` — API endpoint selection and upload request.
- `server/server.js` — Express app and API route mounting.
- `server/routes/ocrRouter.js` — multipart upload validation and limits.
- `server/controller/ocrController.js` — OCR processing and response.
- `server/utils/extractAadhaar.js` — structured field extraction.
- `server/utils/extractAadhaar.test.js` — extraction checks.

## Privacy

Card images are uploaded to the backend for OCR. Treat the resulting text and uploaded card images as sensitive personal information; only use images you are authorized to process.
