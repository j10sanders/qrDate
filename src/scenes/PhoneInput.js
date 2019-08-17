import React, { useState, Fragment, useEffect, useContext } from "react";
import { Button, FormField } from "grommet";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { Phone } from "grommet-icons";
import axios from "axios";
import QrRender from "../components/QR-render";
import NewUser from "./NewUser";
import { loadState } from "../utils/saveLocal";
import Survey from "./Survey";
import SocketContext from "../components/SocketContext";

const PhoneInput = () => {
  const [number, setValue] = useState("");
  const [makeUser, newUser] = useState(false);
  const [existingUser, gotExistingUser] = useState(loadState("existingUser"));
  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   console.log("Sending Socket Event");
  //   socket.on("connect", () => {
  //     socket.emit("STORE_USER_ID", {
  //       socketId: "asd" + socket.io.engine.id,
  //       userId: "123456"
  //     });
  //   });
  //   socket.emit("COMPARE", { fromUserId: "123456" });

  //   socket.on("SCANNED_ALL", data => {
  //     console.log("SCANNED_ALL Sent", data);
  //   });
  //   socket.on("SCANNED_YOU", data => {
  //     console.log("SCANNED2", data);
  //   });
  //   console.log("reached1");
  //   // socket.emit("STORE_USER_ID", {});
  // }, []); //only re-run the effect if new message comes in

  const callApi = async num => {
    const formattedNumber = num.replace(/[- )(]/g, "");
    const res = await axios.get(
      `https://qrmatch.herokuapp.com/user/${formattedNumber}`
    );
    if (res.data.user) {
      const { user } = res.data;
      if (user.firstName) {
        console.log("user: ", user);
      }
      if (user.Responses) {
        gotExistingUser(user);
      }
      if (user[0] === 0) {
        newUser(true);
      }
    }
  };

  if (existingUser) {
    if (existingUser && existingUser.Responses) {
      return (
        <QrRender
          qAndAs={existingUser.Responses[0].answersJson}
          user={existingUser}
        />
      );
    }
    return <Survey user={existingUser} />;
  }

  if (makeUser) {
    return <NewUser phone={number} />;
  }

  return (
    <Fragment>
      <div style={{ paddingBottom: "2rem" }}>
        <FormField label="Sign up or login with your phone number:">
          <ReactPhoneInput
            defaultCountry="us"
            value={number}
            onChange={num => setValue(num)}
            inputStyle={{ border: "0px", boxShadow: "none" }}
            buttonStyle={{ backgroundColor: "white", border: "0px" }}
            inputExtraProps={{ autoFocus: true }}
          />
        </FormField>
      </div>
      <Button
        label="Submit"
        primary
        icon={<Phone />}
        onClick={() => {
          callApi(number);
        }}
      />
    </Fragment>
  );
};

export default PhoneInput;
