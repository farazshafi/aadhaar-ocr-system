const FIELDS = [
    { label: 'Name', key: 'name', full: false },
    { label: 'Date of Birth', key: 'dob', full: false },
    { label: 'Gender', key: 'gender', full: false },
    { label: 'Aadhaar Number', key: 'aadhaarNumber', full: false },
    { label: 'Address', key: 'address', full: true },
]

export default function ResultPanel({ data = {}, onReset }) {
    return (
        <div className="result-state">
            <div className="result-header">
                <div className="result-badge">✓ Extracted</div>
                <h2>Aadhaar Information</h2>
            </div>

            <div className="result-fields">
                {FIELDS.map(({ label, key, full }) => (
                    <div key={key} className={`result-field ${full ? 'full' : ''}`}>
                        <span className="field-label">{label}</span>
                        <span className={`field-value ${data[key] ? '' : 'field-placeholder'}`}>
                            {data[key] || 'Processing…'}
                        </span>
                    </div>
                ))}
            </div>

            <button className="reset-btn" onClick={onReset}>
                ← Upload New Aadhaar
            </button>
        </div>
    )
}
