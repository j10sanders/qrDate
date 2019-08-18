import React, { useState, useContext, useEffect } from "react";
import { Camera, Close } from "grommet-icons";
import styled from "styled-components";
import QrReader from "../components/Qr-reader";
import SocketContext from "../components/SocketContext";
import { BiggerButton } from "../components/MyStyledComponents";

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const ShowScannerButton = ({ showReader, setScanResult }) => {
  return (
    <BiggerButton
      label="Tap to Scan"
      primary
      icon={<Camera />}
      onClick={() => {
        setScanResult(null);
        showReader(true);
      }}
      style={{ marginTop: "0rem", marginBottom: "1rem" }}
    />
  );
};

const ScanOrShow = ({ setScanResult, result }) => {
  const [error, setError] = useState();
  const [readerShowing, showReader] = useState(false);

  if (!readerShowing) {
    return (
      <ButtonContainer>
        <ShowScannerButton
          showReader={showReader}
          setScanResult={setScanResult}
        />
      </ButtonContainer>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ButtonContainer>
      <BiggerButton
        primary
        label="Close QR Scanner"
        onClick={() => showReader(false)}
        icon={<Close />}
        style={{ marginTop: "0rem", marginBottom: "1rem" }}
      />
      <div>
        <QrReader setScanResult={setScanResult} setError={setError} />
      </div>
      <p>{result}</p>
    </ButtonContainer>
  );
};

export default ScanOrShow;
