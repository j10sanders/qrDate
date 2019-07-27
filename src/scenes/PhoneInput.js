import React, { useState, Fragment } from 'react'
import { Button, FormField } from 'grommet'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { Phone } from "grommet-icons"
import axios from "axios"
import NewUser from './NewUser'

const PhoneInput = () => {
  const [number, setValue] = useState('')
  const [makeUser, newUser] = useState(false)
  console.log(makeUser, "make")
  const callApi = async num => {
    const formattedNumber = num.replace(/[- )(]/g, '')
    const res = await axios.get(`https://qrmatch.herokuapp.com/user/${formattedNumber}`)
    if (!res.data) {
      debugger
    }
    if (res.data.user) {
      const { user } = res.data
      if (user.firstName) {
        console.log("user: ", user)
      }
      if (user[0] === 0) {
        newUser(true)
      }
    }
  }

  if (makeUser) {
    return <NewUser phone={number} />
  }

  return (
    <Fragment>
      <div style={{ paddingBottom: '2rem' }}>
        <FormField label="Your phone number:">
          <ReactPhoneInput
            defaultCountry="us"
            value={number}
            onChange={num => setValue(num)}
            inputStyle={{border: '0px', boxShadow: 'none' }}
            buttonStyle={{backgroundColor: 'white', border: '0px'}}
            inputExtraProps={{autoFocus: true}}
          />
        </FormField>
      </div>
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
