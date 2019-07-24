import React, { useState, Fragment } from 'react'
import { Button, TextInput } from 'grommet'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { Phone } from "grommet-icons"
import NewUser from './NewUser'
import axios from "axios"



const PhoneInput = () => {
  const [number, setValue] = React.useState('');
  const [makeUser, newUser] = React.useState(false);
  console.log(makeUser, "make")
  const callApi = async num => {
    const formattedNumber = num.replace(/[- )(]/g,'')
    console.log(formattedNumber, "formatted")
    newUser(true)
    // return <NewUser phone={formattedNumber} />
    // const res = await axios.get(`https://qrmatch.herokuapp.com/users`)
    // if (!res.data) {
      // return <Survey phone/>
    // }
  }
  if (makeUser) {
    return <NewUser phone={number} />
  }
  return (
    <Fragment>
      <ReactPhoneInput
        defaultCountry="us"
        value={number}
        onChange={num => setValue(num)}
      />
      <Button
        label="Submit"
        primary
        icon={<Phone />}
        onClick={() => {
          callApi(number)
        }}
      />
    </Fragment>
  )
}

export default PhoneInput
