import React from "react";
import { Grommet, Box, Button } from "grommet";
import { Row, Col, Container } from "react-bootstrap";
import * as io from "socket.io-client";
import PhoneInput from "./scenes/PhoneInput";
import { saveState } from "./utils/saveLocal";
import SocketContext from "./components/SocketContext";
require("dotenv").config();

const theme = {
  global: {
    colors: {
      brand: "#770087",
      active: "#E413C3",
      border: {
        active: "#E413C3"
      },
      focus: "#E413C3",
      text: {
        dark: "#f8f8f8",
        light: "#444444"
      }
    },
    formField: {
      border: {
        color: "#E413C3"
      }
    }
  }
};
// const socket = io("https://qrmatch.herokuapp.com");
console.log("SOCKET HOST~~~", process.env.REACT_APP_SOCKET_HOST);
const socket = io(process.env.REACT_APP_SOCKET_HOST);

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Grommet theme={theme}>
        <Box
          border={{ color: "brand", size: "medium", style: "double" }}
          pad="small"
          round="small"
        >
          <Container>
            <Row>
              <Col style={{ minHeight: "-webkit-fill-available" }}>
                <div style={{ paddingTop: "2rem" }}>
                  <PhoneInput />
                </div>
              </Col>
            </Row>
            <Button
              onClick={() => {
                saveState("existingUser", null);
                window.location.reload();
              }}
              label="clear cache"
            />
          </Container>
        </Box>
      </Grommet>
    </SocketContext.Provider>
  );
};

export default App;
