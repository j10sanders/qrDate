import React, { useState, useEffect, useContext } from "react";
import QRCode from "qrcode.react";
import { Text, Box } from 'grommet'
import styled from 'styled-components'
import ScanOrShow from "../scenes/ScanOrShow";
import compareTwoResponses from "../utils/compareTwoReponses";
import SocketContext from "./SocketContext";
import ShowResults from "../scenes/ShowResults";

const StyledQR = styled(QRCode)`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translate(-50%, -10%);
  margin: 0 auto;
`

const QrRender = ({ qAndAs, user }) => {
  const [result, setScanResult] = useState();
  const [comparedResult, compare] = useState();
  const [socketResponse, setSocketResponse] = useState();
  const socket = useContext(SocketContext);
  const myResults = [...qAndAs];
  const fullObject = JSON.stringify({
    firstName: user.firstName,
    userId: user.id,
    qAndAs
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("STORE_USER_ID", {
        socketId: socket.io.engine.id,
        userId: user.id
      });
    });
    socket.on("SCANNED_YOU", data => {
      setSocketResponse(data);
    });
    socket.on("SCANNED_YOU2", data => {
      setSocketResponse(data);
    });
  }, [socketResponse]);

  const resetCompare = () => {
    setScanResult(null)
    compare(null)
    setSocketResponse(null)
  }

  if (comparedResult) {
    return (
      <ShowResults
        result={result}
        fromUserId={user.id}
        resetCompare={resetCompare}
      />
    );
  }

  if (socketResponse) {
    return (
      <ShowResults
        socketResponse={socketResponse}
        resetCompare={resetCompare}
      />
    )
  }

  if (result) {
    socket.emit("COMPARE", {
      scanningUserId: user.id,
      scannedUserId: result.userId,
      surveyId: 4
    });
    compare(compareTwoResponses(myResults, result));
  }

  return (
    <Box>
      <Text alignSelf="center" size="xlarge" color="#B300B3">
        Lookin good,{" "}
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
      </Text>
      <ScanOrShow result={result} setScanResult={setScanResult} />
      <StyledQR
        value={fullObject}
        size={256}
        renderAs="svg"
        fgColor="#7d4cdb"
      />
    </Box>
  );
};

export default QrRender;
