import React, { Fragment } from 'react'
import { Button, FormField, Form } from 'grommet'
import axios from "axios"

const onSubmit = async (value, phone) => {
  const phoneNumber = phone.replace(/[- )(]/g,'')
  const userFields = {phoneNumber, ...value}
  const res = await axios.post(`https://qrmatch.herokuapp.com/user`, {userFields})
  if (!res.data) {
    debugger
  }
  if (res.data.user){
    const { user } = res.data
    if (user[0] === 0){
      debugger
    }
    if (user[0].firstName) {
      debugger
    }
  debugger
  }
  debugger
}

const User = ({ phone }) => {
  return (
    <Fragment>
      {phone}
      <Form onSubmit={({ value }) => onSubmit(value, phone)}>
        <FormField label="first name" name="firstName" required />
        <FormField label="last name" name="lastName" required />
        <FormField label="email (optional)" name="email" />
        <Button type="submit" primary label="Submit" />
      </Form>
    </Fragment>
  )
}

export default User
