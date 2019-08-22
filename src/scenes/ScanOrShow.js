import React, { useState, useContext, useEffect } from "react";
import { Camera, Close } from "grommet-icons";
import styled from "styled-components";
import QrReader from "../components/Qr-reader";
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

const ScanOrShow = ({ setScanResult, result, readerShowing, showReader }) => {
  const [error, setError] = useState();
  

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
      <div style={{marginTop: '1rem'}}>
        <QrReader setScanResult={setScanResult} setError={setError} />
      </div>
      <BiggerButton
        primary
        label="Close QR Scanner"
        onClick={() => showReader(false)}
        icon={<Close />}
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
      />
    </ButtonContainer>
  );
};

export default ScanOrShow;
