import React, { Fragment, useState, useContext } from "react";
import QRCode from "qrcode.react";
import ScanOrShow from "../scenes/ScanOrShow";
import compareTwoResponses from "../utils/compareTwoReponses";
import SocketContext from "./SocketContext";

import ShowResults from "../scenes/ShowResults";
const QrRender = ({ qAndAs, user }) => {
  const [result, setScanResult] = useState();
  const [comparedResult, compare] = useState();
  const socket = useContext(SocketContext);
  const myResults = [...qAndAs];
  const fullObject = JSON.stringify({
    firstName: user.firstName,
    userId: user.id,
    qAndAs
  });

  if (comparedResult) {
    return (
      <ShowResults
        result={result}
        comparedResult={comparedResult}
        fromUserId={user.id}
      />
    );
  }

  if (result) {
    console.log(result, "~~result");
    console.log(myResults, "myresults");
    socket.on("connect", () => {
      socket.emit("STORE_USER_ID", {
        socketId: "asd" + socket.io.engine.id,
        userId: "123456"
      });
    });
    socket.emit("COMPARE", {
      fromUserId: user.id,
      toUserId: result.userId,
      surveyId: 4
    });
    debugger;
    compare(compareTwoResponses(myResults, result));
  }

  return (
    <Fragment>
      <p style={{ textAlign: "center" }}>
        Hello,{" "}
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
      </p>
      <ScanOrShow result={result} setScanResult={setScanResult} />
      <QRCode
        value={fullObject}
        size={256}
        renderAs="svg"
        style={{ display: "block", margin: "auto" }}
        fgColor="#7d4cdb"
      />
    </Fragment>
  );
};

export default QrRender;
