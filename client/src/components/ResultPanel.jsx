export default function ResultPanel({ data, loading, error, onReset }) {

    if (loading) {
        return (
            <div className="result-state">
                <div className="result-header">
                    <h2>Extracting data…</h2>
                    <p style={{ color: 'var(--clr-yellow)', marginTop: '0.5rem' }}>
                        Please wait while we process your images.
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="result-state">
                <div className="result-header">
                    <div className="result-badge" style={{ background: '#c0392b' }}>✗ Error</div>
                    <h2>Extraction Failed</h2>
                    <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>{error}</p>
                </div>
                <button className="reset-btn" onClick={onReset}>
                    ← Try Again
                </button>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="result-state">
                <div className="result-header">
                    <h2>No data yet</h2>
                </div>
            </div>
        )
    }

    const fields = [
        { label: "Name", value: data.name },
        { label: "Date of Birth", value: data.dateOfBirth },
        { label: "Gender", value: data.gender },
        { label: "Aadhaar Number", value: data.aadhaarNumber },
        { label: "Address", value: data.address },
    ];

    return (
        <div className="result-state">
            <div className="result-header">
                <div className="result-badge">✓ Extracted</div>
                <h2>OCR Result</h2>
            </div>

            <div className="result-fields">
                {fields.map(({ label, value }) => (
                    <div className={`result-field${label === "Address" ? " address-field" : ""}`} key={label}>
                        <span className="field-label">{label}</span>
                        <span
                            className="field-value"
                            style={!value ? { color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' } : {}}
                        >
                            {value || "—"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Collapsible raw OCR text for debugging */}
            {/* {(data.rawText?.front || data.rawText?.back) && (
                <details style={{ marginTop: '1rem', width: '100%' }}>
                    <summary style={{ cursor: 'pointer', color: 'var(--clr-yellow)', fontSize: '0.85rem', userSelect: 'none' }}>
                        Raw OCR Text (debug)
                    </summary>
                    {data.rawText?.front && (
                        <div className="result-field full" style={{ marginTop: '0.5rem' }}>
                            <span className="field-label">Front Side</span>
                            <pre className="field-value ocr-text">{data.rawText.front}</pre>
                        </div>
                    )}
                    {data.rawText?.back && (
                        <div className="result-field full" style={{ marginTop: '0.5rem' }}>
                            <span className="field-label">Back Side</span>
                            <pre className="field-value ocr-text">{data.rawText.back}</pre>
                        </div>
                    )}
                </details>
            )} */}

            <button className="reset-btn" onClick={onReset}>
                ← Upload New Document
            </button>
        </div>
    )
}
