import React, { useState } from 'react'
import { Button } from 'grommet'
import { Camera, Close } from "grommet-icons"
import QrReader from '../components/Qr-reader'
import compareTwoResponses from '../utils/compareTwoReponses'
import styled from 'styled-components'

const CenteredButton = styled(Button)`
  margin: 0 auto;
  display: block;
`

const ButtonContainer = styled.div`
  margin-top: 4rem;
`

const ShowScannerButton = ({ showReader, setScanResult }) => {
  return (
    <CenteredButton
      label="Scan QR Code"
      primary
      icon={<Camera />}
      onClick={() => {
        setScanResult(null)
        showReader(true)
      }
      }
      style={{ display: 'block', margin: '0 auto', marginBottom: '1rem' }}
    />
  )
}

const ScanOrShow = ({ myResults }) => {
  const [result, setScanResult] = useState()
  const [error, setError] = useState()
  const [readerShowing, showReader] = useState(false)
  const [comparedResult, compare] = useState()

  if (comparedResult) {
    return <div>{JSON.stringify(comparedResult)}</div>
  }


  if (result) {
    console.log(myResults, result)
    compare(compareTwoResponses(JSON.parse(myResults), JSON.parse(result)))
  }
  // if (result) {
  //   return(
  //     <ButtonContainer>
  //       {result}
  //       <ShowScannerButton showReader={showReader} setScanResult={setScanResult} />
  //     </ButtonContainer>
  //   )
  // }

  if (!readerShowing) {
    return (
      <ButtonContainer>
        <ShowScannerButton showReader={showReader} setScanResult={setScanResult} />
      </ButtonContainer>
    )
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    )
  }


  return (
    <ButtonContainer>
      <CenteredButton primary label="Close QR Scanner" onClick={() => showReader(false)} icon={<Close />} />
      <div style={{ marginTop: '1rem' }}>
        <QrReader
          setScanResult={setScanResult}
          setError={setError}
        />
      </div>
      <p>{result}</p>
    </ButtonContainer>
  )

}

export default ScanOrShow
