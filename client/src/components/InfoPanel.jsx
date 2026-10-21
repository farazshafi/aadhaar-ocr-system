export default function InfoPanel({ bothUploaded, onProceed }) {
    return (
        <div className="info-state">
            <div className="info-icon-wrap">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="3" stroke="#FFB22C" strokeWidth="1.5" />
                    <circle cx="8" cy="10" r="2" stroke="#FFB22C" strokeWidth="1.5" />
                    <path
                        d="M5 16c0-1.657 1.343-3 3-3s3 1.343 3 3"
                        stroke="#FFB22C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path d="M15 10h3M15 13h2" stroke="#FFB22C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>

            <h1 className="info-title">Upload your Aadhaar</h1>
            <p className="info-subtitle">
                Get information from Aadhaar instantly using AI-powered OCR.
                Upload both sides to extract your name, DOB, address and more.
            </p>

            <div className="feature-chips">
                <span className="chip">⚡ Instant Extraction</span>
                <span className="chip">🔒 Secure &amp; Private</span>
                <span className="chip">🤖 AI Powered</span>
            </div>

            <button
                className={`proceed-btn ${bothUploaded ? 'ready' : 'dim'}`}
                onClick={onProceed}
                disabled={!bothUploaded}
                id="proceed-button"
            >
                {bothUploaded ? 'Proceed ⇒' : 'Upload both sides to proceed'}
            </button>

            {!bothUploaded && (
                <p className="proceed-hint">
                    Upload both front and back of your Aadhaar card on the left to continue.
                </p>
            )}
        </div>
    )
}
