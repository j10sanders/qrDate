import React from 'react';
import QR from 'react-qr-reader';

const QrReader = ({setError, setScanResult}) => {
  return (
    <div>
      <QR
        delay={300}
        onError={err => setError(err)}
        onScan={data => setScanResult(data)}
        style={{ width: '50%', height: '50%'}}
      />
    </div>
  )
}

export default QrReader
