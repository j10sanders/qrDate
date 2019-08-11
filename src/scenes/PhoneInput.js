import React, { useState, Fragment, useEffect } from 'react'
import { Button, FormField } from 'grommet'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { Phone } from "grommet-icons"
import axios from "axios"
import QrRender from '../components/QR-render'
import NewUser from './NewUser'
import { loadState } from '../utils/saveLocal'
import Survey from './Survey';

const PhoneInput = () => {
  const [number, setValue] = useState('')
  const [makeUser, newUser] = useState(false)
  const [existingUser, gotExistingUser] = useState(loadState('existingUser'))

  // useEffect(() => {
  //   getExistingUser(loadState('existingUser'))
  // })

  const callApi = async num => {
    const formattedNumber = num.replace(/[- )(]/g, '')
    const res = await axios.get(`https://qrmatch.herokuapp.com/user/${formattedNumber}`)
    if (!res.error) {
      newUser(true)
    }
    if (res.data.user) {
      const { user } = res.data
      if (user.firstName) {
        console.log("user: ", user)
      }
      if (user.Responses){
        gotExistingUser(user)
      }
      if (user[0] === 0) {
        newUser(true)
      }
    }
  }

  if (existingUser) {
    console.log(existingUser, "existingUser")
    if (existingUser.user && existingUser.user.Responses) {
      return  <QrRender qAndAs={JSON.stringify(existingUser.user.Responses[0].answersJson)} user={existingUser.user} />
    }
    return <Survey user={existingUser} />
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
