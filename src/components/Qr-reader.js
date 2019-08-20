import React from "react";
import QR from "react-qr-reader";

const QrReader = ({ setError, setScanResult }) => {
  return (
    <QR
      delay={300}
      onError={err => setError(err)}
      onScan={data => setScanResult(JSON.parse(data))}
      style={{ width: "75%", height: "75%", margin: "0 auto" }}
    />
  );
};

export default QrReader;
