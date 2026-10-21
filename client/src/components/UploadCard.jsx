import { useRef } from 'react'

export default function UploadCard({ label, file, onFileChange, id }) {
    const inputRef = useRef(null)

    const handleDrop = (e) => {
        e.preventDefault()
        const dropped = e.dataTransfer.files[0]
        if (dropped) onFileChange(dropped)
    }

    const handleDragOver = (e) => e.preventDefault()

    return (
        <div
            className={`upload-card ${file ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                id={id}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e.target.files[0])}
            />

            {file ? (
                <div className="preview-wrapper">
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`${label} preview`}
                        className="preview-img"
                    />
                    <div className="preview-overlay">
                        <span className="preview-label">{label}</span>
                        <span className="change-text">Click to change</span>
                    </div>
                </div>
            ) : (
                <div className="upload-content">
                    <div className="upload-icon-ring">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 16V8M12 8L8.5 11.5M12 8L15.5 11.5"
                                stroke="#FFB22C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                stroke="#FFB22C"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <p className="upload-label">{label}</p>
                    <p className="upload-hint">Drag & drop or click to upload</p>
                    <button
                        className="upload-btn"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            inputRef.current?.click()
                        }}
                    >
                        Upload
                    </button>
                </div>
            )}
        </div>
    )
}
