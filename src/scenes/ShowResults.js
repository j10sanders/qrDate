import React, { useState, Fragment, useEffect, useContext } from "react";
import { Button, FormField, Text } from "grommet";
import axios from "axios";
import GetGif from "../utils/getGif";
import SocketContext from "../components/SocketContext";

const ShowResult = ({ result, comparedResult, fromUserId, surveyId }) => {
  console.log(result, "RESULT");
  const socket = useContext(SocketContext);

  useEffect(async () => {
    console.log(fromUserId, surveyId, result.userId);
    debugger;
    socket.emit("COMPARE", { fromUserId, surveyId, toUserId: result.userId });
    const res = await axios.post(`https://qrmatch.herokuapp.com/compare`, {
      fromUserId,
      toUserId: result.userId,
      surveyId: 3
    });
    console.log(res, "Result of compare");
  });
  return (
    <Fragment>
      <Text>You scanned </Text>
      <Text>
        {result.firstName.charAt(0).toUpperCase() + result.firstName.slice(1)}
      </Text>
      <img style={{ maxWidth: "-webkit-fill-available" }} src={GetGif(0.6)} />
    </Fragment>
  );
};

export default ShowResult;
