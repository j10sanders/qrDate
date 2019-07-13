import React, { useState } from 'react'
import { Button } from 'grommet'
import { Camera, Close } from "grommet-icons"
import QrReader from '../components/Qr-reader'


const ShowScannerButton = ({ showReader, setScanResult }) => {
  return (
    <Button
      label="Scan QR Code"
      primary
      icon={<Camera />}
      onClick={() => {
        setScanResult(null)
        showReader(true)}
      }
    />
  )
}

const ScanOrShow = () => {
  const [result, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const [readerShowing, showReader] = useState(false)
  
  if (result) {
    return(
      <div>
        {result}
        <ShowScannerButton showReader={showReader} setScanResult={setScanResult} />
      </div>
    )
  }

  if (!readerShowing) {
    return <ShowScannerButton showReader={showReader} setScanResult={setScanResult} />
  }

  if (error) {
    return(
      <div>
        Error: 
        {' '}
        {error}
      </div>
    )
  }

    return (
      <div>
        <Button primary label="Close QR Scanner" onClick={() => showReader(false)} icon={<Close />} />
        <QrReader
          setScanResult={setScanResult}
          setError={setError}
        />
        <p>{result}</p>
      </div>
    )
  
}

export default ScanOrShow
