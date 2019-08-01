
import React from 'react';
import QRCode from 'qrcode.react';
 
const QrRender = qAndAs => {
  return (
    <QRCode value={qAndAs.data} size={256} renderAs="svg" style={{ display: 'block', margin: 'auto' }} fgColor="#7d4cdb" />
  )
}

export default QrRender