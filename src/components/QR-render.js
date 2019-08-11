
import React, { Fragment, useState } from 'react';
import QRCode from 'qrcode.react';
import ScanOrShow from '../scenes/ScanOrShow'
import compareTwoResponses from '../utils/compareTwoReponses'
import ShowResults from '../scenes/ShowResults'

const QrRender = ({ qAndAs, user }) => {
  const [result, setScanResult] = useState()
  const [comparedResult, compare] = useState()
  const myResults = [...qAndAs]

  if (comparedResult) {
    return <ShowResults result={result} comparedResult={comparedResult} />
  }
  
  if (result) {
    console.log(result, "result")
    console.log(myResults, "myresults")
    debugger
    compare(compareTwoResponses(myResults, result))
  }

  const fullObject = JSON.stringify({ firstName: user.firstName, userId: user.id, qAndAs })
  return (
    <Fragment>
      <p style={{ textAlign: 'center' }}>
        Lookin good,
        {' '}
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
      </p>
      <ScanOrShow result={result} setScanResult={setScanResult} />
      <QRCode value={fullObject} size={256} renderAs="svg" style={{ display: 'block', margin: 'auto' }} fgColor="#7d4cdb" />
    </Fragment>
  )
}

export default QrRender