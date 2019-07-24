import React, { Fragment } from 'react'
import { Button, FormField, Form } from 'grommet'
import axios from "axios"

const onSubmit = (value, phone) => {
  const phoneNumber = phone.replace(/[- )(]/g,'')
  const user = {phoneNumber, ...value}
  console.log(user, "USER")
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
