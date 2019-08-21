import React, { useState, Fragment, useEffect } from "react";
import {
  Text,
  Meter,
  Box,
  Stack,
  Table,
  TableRow,
  TableCell,
  Accordion,
  AccordionPanel
} from "grommet";
import axios from "axios";
import GetGif from "../utils/getGif";
import survey from "../utils/survey";
import { BiggerButton } from "../components/MyStyledComponents";

const Ordinal_suffix_of = i => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const ShowResult = ({ result, fromUserId, socketResponse, resetCompare }) => {
  const [rank, setRank] = useState();
  const [totalPlayers, setTotalPlayers] = useState();
  const [sameAnswers, setSharedAnswers] = useState([]);
  useEffect(() => {
    const displayData = data => {
      setRank(data.rank);
      setTotalPlayers(data.totalPlayers);
      const { sharedAnswers } = data;
      const fullAnswers = sharedAnswers.map(ob => [
        survey.data[Object.keys(ob)].question,
        survey.data[Object.keys(ob)].answers[Object.values(ob)]
      ]);

      setSharedAnswers(fullAnswers);
    };

    const compare = async () => {
      const res = await axios.post(`https://qrmatch.herokuapp.com/compare`, {
        fromUserId,
        toUserId: result.userId,
        surveyId: process.env.REACT_APP_SURVEY_ID || 1
      });
      const { data } = res || {};
      displayData(data);
    };
    if (!socketResponse) {
      compare();
    } else {
      displayData(socketResponse);
    }
  });

  return (
    <Fragment>
      <Box>
        <Text alignSelf="center" size="xlarge" color="#B300B3">
          You scanned{" "}
          {/* {result.firstName.charAt(0).toUpperCase() + result.firstName.slice(1)} */}
        </Text>
      </Box>
      {sameAnswers.length && (
        <div>
          <img
            style={{
              maxWidth: "-webkit-fill-available",
              padding: "1rem",
              display: "block",
              margin: "auto"
            }}
            alt="gif"
            src={GetGif((totalPlayers - rank + 1) / totalPlayers)}
          />
          <Box align="center" pad="large">
            <Stack anchor="center" style={{ padding: "1rem" }}>
              <Meter
                thickness="small"
                alignSelf="center"
                values={[
                  {
                    value: 100 * ((totalPlayers - rank + 1) / totalPlayers),
                    color: "accent-1"
                  }
                ]}
                round
                size="xsmall"
                type="circle"
              />
              <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
                <Text size="small">#</Text>
                <Text size="xlarge" weight="bold">
                  {rank}
                </Text>
              </Box>
            </Stack>
            <Text bold>
              You came in {Ordinal_suffix_of(rank)} out of {totalPlayers}{" "}
              players!
            </Text>
            <div style={{ display: "block" }}>
              <BiggerButton
                primary
                label="Scan Someone Else"
                onClick={resetCompare}
              />
              <Accordion animate="true" margin="small">
                <AccordionPanel label="What you agreed on:">
                  <Table>
                    {sameAnswers.map(arr => (
                      <TableRow key={arr[0]}>
                        <TableCell scope="row">
                          <div style={{ paddingTop: "3rem" }}>
                            <strong>{arr[0]}</strong>
                          </div>
                        </TableCell>
                        <TableCell scope="row">
                          <div style={{ paddingTop: "3rem" }}>{arr[1]}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                  <BiggerButton
                    primary
                    label="Scan Someone Else"
                    onClick={resetCompare}
                  />
                </AccordionPanel>
              </Accordion>
            </div>
          </Box>
        </div>
      )}
    </Fragment>
  );
};

export default ShowResult;
