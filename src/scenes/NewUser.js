import React, { Fragment, useState } from 'react'
import { Button, FormField, Form } from 'grommet'
import axios from "axios"
import styled from 'styled-components'
import Survey from './Survey'

export const StyledField = styled(FormField)`
  padding-top: 1rem;
`

const User = ({ phone }) => {
  const [newUser, registerUser] = useState(null)
  const onSubmit = async (value, phone) => {
    const phoneNumber = phone.replace(/[- )(]/g,'')
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
    return <Survey user={newUser} />
  }
  return (
    <Fragment>
      {phone}
      <Form onSubmit={({ value }) => onSubmit(value, phone)} style={{paddingTop: '2rem'}}>
        <StyledField label="first name" name="firstName" required />
        <StyledField label="last name" name="lastName" required />
        <StyledField label="email (optional)" name="email" />
        <Button type="submit" primary label="Submit" style={{marginTop: '3rem'}} />
      </Form>
    </Fragment>
  )
}

export default User
