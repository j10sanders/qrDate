import React, { Fragment, useState } from 'react'
import { Form } from 'grommet'
import axios from "axios"
import { BiggerButton, StyledField } from '../components/MyStyledComponents'
import { saveState, loadState } from '../utils/saveLocal'
import Survey from './Survey'

const User = ({ phone }) => {
  const [newUser, registerUser] = useState(loadState('existingUser'))
  const [phoneNumber] = useState(phone.replace(/[- )(]/g,''))
  const onSubmit = async (value) => {
    const userFields = {phoneNumber, ...value}
    const res = await axios.post(`https://qrmatch.herokuapp.com/user`, {userFields})
    if (!res.data) {
      debugger
    }
    if (res.data.user){
      const { user } = res.data
      if (user.firstName) {
        registerUser(user)
      }
    }
  }
  if (newUser) {
    console.log(newUser, "newUser")
    debugger
    saveState('existingUser', newUser)
    return <Survey user={newUser} phoneNumber={phoneNumber} />
  }
  return (
    <Fragment>
      {phone}
      <Form onSubmit={({ value }) => onSubmit(value, phone)} style={{ paddingTop: '2rem' }}>
        <StyledField label="first name" name="firstName" required />
        <StyledField label="last name" name="lastName" required />
        <StyledField label="email (optional)" name="email" />
        <BiggerButton type="submit" primary label="Submit" style={{ marginTop: '3rem', display: 'initial' }} />
      </Form>
    </Fragment>
  )
}

export default User
