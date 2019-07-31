
import React from 'react';
import QRCode from 'qrcode.react';
 
const QrRender = data => {
  return (
    <QRCode value={data} />
  )
}

export default QrRender