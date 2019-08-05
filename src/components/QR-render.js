
import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';
import ScanOrShow from '../scenes/ScanOrShow'
 
const QrRender = qAndAs => {
  return (
    <Fragment>
      <QRCode value={qAndAs.data} size={256} renderAs="svg" style={{ display: 'block', margin: 'auto' }} fgColor="#7d4cdb" />
      <ScanOrShow myResults={qAndAs.data} />
    </Fragment>
    
  )
}

export default QrRender