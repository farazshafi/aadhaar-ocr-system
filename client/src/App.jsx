import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import UploadPanel from './components/UploadPanel'
import InfoPanel from './components/InfoPanel'
import ResultPanel from './components/ResultPanel'

import { extractAadhaarData } from './api/ocrApi'

function App() {
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const [proceeded, setProceeded] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ocrData, setOcrData] = useState(null);

  const bothUploaded = frontFile && backFile

  const handleProceed = async () => {
    if (!bothUploaded || loading) return;

    setLoading(true);
    setError("");
    setProceeded(true);

    try {
      const result = await extractAadhaarData(frontFile, backFile);

      if (!result.success) {
        throw new Error(result.message || "OCR failed");
      }

      setOcrData(result.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to extract information"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFrontFile(null);
    setBackFile(null);
    setProceeded(false);
    setOcrData(null);
    setError("");
  };

  return (
    <div className="page">
      <Navbar />

      <main className="landing">
        {/* left panel */}
        <UploadPanel
          frontFile={frontFile}
          backFile={backFile}
          onFrontChange={setFrontFile}
          onBackChange={setBackFile}
        />

        <div className="panel-divider" />

        {/* right panel */}
        <section className="panel panel-right">
          {!proceeded ? (
            <InfoPanel bothUploaded={bothUploaded} onProceed={handleProceed} />
          ) : (
            <ResultPanel
              data={ocrData}
              loading={loading}
              error={error}
              onReset={handleReset}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
