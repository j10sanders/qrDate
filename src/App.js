import React from "react";
import { Grommet, Box, FormField, Button } from "grommet";
import { Row, Col, Container } from "react-bootstrap";
import ScanOrShow from "./scenes/ScanOrShow";
import PhoneInput from "./scenes/PhoneInput";
import NewUser from "./scenes/NewUser";
import Survey from "./scenes/Survey";
import { saveState } from "./utils/saveLocal";
import SocketContext from "./components/SocketContext";
import * as io from "socket.io-client";

// import Spinner from './components/Spinner'

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

const socket = io("https://qrmatch.herokuapp.com");

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Grommet theme={theme}>
        <Box
          // direction="row"
          border={{ color: "brand", size: "medium", style: "double" }}
          pad="small"
          // fill
          // flex
          round="small"
        >
          <Container>
            <Row>
              <Col style={{ minHeight: "-webkit-fill-available" }}>
                <div style={{ paddingTop: "2rem" }}>
                  <PhoneInput />
                  {/* <Survey /> */}
                  {/* <ScanOrShow /> */}
                </div>
              </Col>
            </Row>
            {/* <Button
              onClick={() => {
                saveState("existingUser", null);
                window.location.reload();
              }}
              label="clear cache"
            /> */}
          </Container>
        </Box>
      </Grommet>
    </SocketContext.Provider>
  );
};

export default App;
