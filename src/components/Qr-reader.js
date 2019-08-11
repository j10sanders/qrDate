import React from 'react';
import QR from 'react-qr-reader';

const QrReader = ({ setError, setScanResult }) => {
  return (
    <QR
      delay={300}
      onError={err => setError(err)}
      onScan={data => setScanResult(JSON.parse(data))}
      style={{ width: '50%', height: '50%', margin: '0 auto' }}
    />
  )
}

export default QrReader
