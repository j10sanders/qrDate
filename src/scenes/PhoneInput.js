import React, { useState, Fragment, useEffect } from "react";
import { FormField, Text } from "grommet";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { Phone } from "grommet-icons";
import axios from "axios";
import QrRender from "../components/QR-render";
import NewUser from "./NewUser";
import { loadState, saveState } from "../utils/saveLocal";
import Survey from "./Survey";
import { BiggerButton } from "../components/MyStyledComponents";

const PhoneInput = () => {
  const [number, setValue] = useState("");
  const [makeUser, newUser] = useState(false);
  const [existingUser, gotExistingUser] = useState(loadState("existingUser"));

  useEffect(() => {
    if (loadState('existingUser')) {
      if (new Date(loadState('existingUser').createdAt) < new Date('Thu Aug 22 2019 17:22:41 GMT-0400')) {
        saveState("existingUser", null);
        window.location.reload();
      }
    }
  }, [])


  const callApi = async num => {
    const formattedNumber = num.replace(/[- )(]/g, "");
    const res = await axios.get(
      `https://qrmatch.herokuapp.com/user/${formattedNumber}`
    );
    if (res.data.user) {
      const { user } = res.data;
      if (user.Responses) {
        gotExistingUser(user);
      }
      if (user[0] === 0) {
        newUser(true);
      }
    }
    if (res.data.error === "No user exists with that phone number") {
      newUser(true);
    }
  };

  if (existingUser) {
    if (
      (existingUser &&
        existingUser.Responses &&
        existingUser.Responses.length) ||
      (existingUser.user &&
        existingUser.user.Responses &&
        existingUser.user.Responses.length)
    ) {
      const user = existingUser.user || existingUser;
      saveState("existingUser", user);
      return <QrRender qAndAs={user.Responses[0].answersJson} user={user} />;
    }
    return <Survey user={existingUser} />;
  }

  if (makeUser) {
    return <NewUser phone={number} />;
  }

  return (
    <Fragment>
      <div style={{ paddingBottom: "2rem", textAlign: "center" }}>
        <Text size="xlarge" color="#770087" weight="bold">
          Sign up/log in with your phone number:
        </Text>
        <FormField style={{ paddingTop: "3rem" }}>
          <ReactPhoneInput
            defaultCountry="us"
            value={number}
            onChange={num => setValue(num)}
            inputStyle={{
              border: "0px",
              boxShadow: "none",
              fontWeight: "bold",
              fontSize: "22px"
            }}
            buttonStyle={{ backgroundColor: "white", border: "0px" }}
            inputExtraProps={{ autoFocus: true }}
          />
        </FormField>
      </div>
      <BiggerButton
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
