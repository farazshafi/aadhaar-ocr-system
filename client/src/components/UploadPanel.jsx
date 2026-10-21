import UploadCard from './UploadCard'

export default function UploadPanel({ frontFile, backFile, onFrontChange, onBackChange }) {
    return (
        <section className="panel panel-left">
            <div className="panel-header">
                <h2>Upload Aadhaar</h2>
                <p>Upload both sides for accurate extraction</p>
            </div>

            <div className="upload-cards">
                <UploadCard
                    label="Front Side"
                    file={frontFile}
                    onFileChange={onFrontChange}
                    id="front-upload"
                />
                <UploadCard
                    label="Back Side"
                    file={backFile}
                    onFileChange={onBackChange}
                    id="back-upload"
                />
            </div>

            <div className="upload-status">
                <div className={`status-dot ${frontFile ? 'active' : ''}`} />
                <span>Front {frontFile ? '✓' : 'not uploaded'}</span>
                <div className={`status-dot ${backFile ? 'active' : ''}`} />
                <span>Back {backFile ? '✓' : 'not uploaded'}</span>
            </div>
        </section>
    )
}
