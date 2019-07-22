import React, { useState, Fragment } from 'react'
import { Button, TextInput } from 'grommet'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { Phone } from "grommet-icons"
import axios from "axios"

const callApi = number => {
  console.log(number)
  debugger
  axios.get(`user/${number}`)
}
const PhoneInput = () => {
  const [value, setValue] = React.useState('');
  return (
    <Fragment>
      <ReactPhoneInput
        defaultCountry="us"
        // placeholder="phone number"
        value={value}
        onChange={num => setValue(num)}
      />
      {console.log(value, "val")}
      <Button
        label="Submit"
        primary
        icon={<Phone />}
        onClick={() => {
          callApi(value)
        }}
      />
    </Fragment>
  )
}

export default PhoneInput
