# Frontend

React 19 and Vite application for uploading both sides of an Aadhaar card and displaying the OCR result. The production site is [aadhaar-image-to-text.vercel.app](https://aadhaar-image-to-text.vercel.app/).

## Local development

```sh
npm install
npm run dev
```

The Vite app calls `http://localhost:5000/api` in development. Start the backend on port 5000 in a second terminal (see [`server/README.md`](../server/README.md)). Upload both images in JPG, PNG, or WEBP format; the API limit is 5 MB per image.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The frontend is deployed on Vercel with `client` as the project root, `npm run build` as the build command, and `dist` as the output directory. Production API requests currently target `https://aadhaar-ocr-system-9xhg.onrender.com/api`; update `src/api/ocrApi.js` if the Render URL changes.

See the [root README](../README.md) for full setup, API, and deployment documentation.
