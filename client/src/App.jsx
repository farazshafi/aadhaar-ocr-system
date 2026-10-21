import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import UploadPanel from './components/UploadPanel'
import InfoPanel from './components/InfoPanel'
import ResultPanel from './components/ResultPanel'

function App() {
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const [proceeded, setProceeded] = useState(false)

  const bothUploaded = frontFile && backFile

  const handleProceed = () => {
    if (bothUploaded) setProceeded(true)
  }

  const handleReset = () => {
    setFrontFile(null)
    setBackFile(null)
    setProceeded(false)
  }

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
            <ResultPanel onReset={handleReset} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
