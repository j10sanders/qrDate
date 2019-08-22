import React from "react";
import QR from "react-qr-reader";

const QrReader = ({ setError, setScanResult }) => {
  return (
    <div style={{margin: 'auto', maxWidth: '27vh'}}>
      <QR
        delay={300}
        showViewFinder={false}
        onError={err => setError(err)}
        onScan={data => setScanResult(JSON.parse(data))}
        style={{ width: "100%", height: "55%", margin: "0 auto" }}
      />
    </div>
  );
};

export default QrReader;
