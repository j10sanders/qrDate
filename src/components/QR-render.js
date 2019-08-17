import React, { Fragment, useState, useEffect, useContext } from "react";
import QRCode from "qrcode.react";
import { Text, Box } from 'grommet'
import ScanOrShow from "../scenes/ScanOrShow";
import compareTwoResponses from "../utils/compareTwoReponses";
import SocketContext from "./SocketContext";
import ShowResults from "../scenes/ShowResults";

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
    console.log("Socket Reached");
    socket.on("SCANNED_YOU", data => {
      console.log("I was scanned 1", data);
      setSocketResponse(data);
    });
    socket.on("SCANNED_YOU2", data => {
      console.log("I was scanned 2", data);
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
    console.log(result, "~~result");
    console.log(myResults, "myresults");

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
      <QRCode
        value={fullObject}
        size={256}
        renderAs="svg"
        style={{ display: "block", margin: "auto", paddingTop: '2rem'}}
        fgColor="#7d4cdb"
      />
    </Box>
  );
};

export default QrRender;
