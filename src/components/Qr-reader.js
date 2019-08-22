import React from "react";
import QR from "react-qr-reader";

const QrReader = ({ setError, setScanResult }) => {
  return (
    <div style={{ maxWidth: '256px', margin: 'auto'}}>
      <QR
        delay={300}
        onError={err => setError(err)}
        onScan={data => setScanResult(JSON.parse(data))}
        style={{ width: "100%", height: "55%", margin: "0 auto" }}
      />
    </div>
  );
};

export default QrReader;
