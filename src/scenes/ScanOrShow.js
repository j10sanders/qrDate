import React, { useState, useContext, useEffect } from "react";
import { Button } from "grommet";
import { Camera, Close } from "grommet-icons";
import styled from "styled-components";
import QrReader from "../components/Qr-reader";
import SocketContext from "../components/SocketContext";

const CenteredButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
`;

const ShowScannerButton = ({ showReader, setScanResult }) => {
  return (
    <CenteredButton
      label="Tap to Scan"
      primary
      icon={<Camera />}
      onClick={() => {
        setScanResult(null);
        showReader(true);
      }}
      style={{ display: "block", margin: "0 auto", marginBottom: "1rem" }}
    />
  );
};

const ScanOrShow = ({ setScanResult, result }) => {
  const [error, setError] = useState();
  const [readerShowing, showReader] = useState(false);

  const socket = useContext(SocketContext);
  // useEffect(() => {
  //   socket.on("SCANNED", data => {
  //     console.log("SCANNED", data);
  //     socket.emit("STORE_USER_ID", {
  //       socketId: socket.io.engine.id,
  //       userId: "123456"
  //     });
  //   });
  //   console.log("reached1");
  //   // socket.emit("STORE_USER_ID", {});
  // });

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
      <CenteredButton
        primary
        label="Close QR Scanner"
        onClick={() => showReader(false)}
        icon={<Close />}
      />
      <div style={{ marginTop: "1rem" }}>
        <QrReader setScanResult={setScanResult} setError={setError} />
      </div>
      <p>{result}</p>
    </ButtonContainer>
  );
};

export default ScanOrShow;
