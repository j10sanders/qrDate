import React, { Fragment, useState } from 'react'
import { Form, Text, CheckBox } from 'grommet'
import axios from "axios"
import { BiggerButton, StyledField, StyledRadioButtonGroup } from '../components/MyStyledComponents'
import { saveState, loadState } from '../utils/saveLocal'
import Survey from './Survey'

const User = ({ phone }) => {
  const [checked, setChecked] = React.useState(false);
  const [newUser, registerUser] = useState(loadState('existingUser'))
  const [phoneNumber] = useState(phone.replace(/[- )(]/g, ''))
  const [sex, setSex] = React.useState('');
  const onSubmit = async (value) => {
    const userFields = { phoneNumber, ...value, sex: sex }
    const res = await axios.post(`https://qrmatch.herokuapp.com/user`, { userFields })
    if (!res.data) {
      debugger
    }
    if (res.data.user) {
      const { user } = res.data
      if (user.firstName) {
        registerUser(user)
      }
    }
  }

  if (newUser) {
    saveState('existingUser', newUser)
    return <Survey user={newUser} phoneNumber={phoneNumber} />
  }
  return (
    <Fragment>
      <Text color="#770087">
        {phone}
      </Text>
      <Form onSubmit={({ value }) => onSubmit(value, phone)} style={{ paddingTop: '2rem' }}>
        <StyledField label="first name" name="firstName" required />
        <StyledField label="last name" name="lastName" required />
        <StyledField label="email (optional)" name="email" />
        <StyledRadioButtonGroup
          label="sex"
          name="sex"
          options={['male', 'female']}
          value={sex}
          onChange={(event) => setSex(event.target.value)}
          required
        />
        <CheckBox
          checked={checked}
          label="Your answers may be used for research purposes, however it will not be linked to your identifying information, all of which will be kept confidential."
          onChange={(event) => setChecked(event.target.checked)}
          required
        />

        <BiggerButton type="submit" primary label="Submit" style={{ marginTop: '3rem', display: 'initial' }} />
      </Form>
    </Fragment>
  )
}

export default User
