import React, { Fragment, useState } from 'react'
import { Form, Text } from 'grommet'
import axios from "axios"
import { BiggerButton, StyledField, StyledRadioButtonGroup } from '../components/MyStyledComponents'
import { saveState, loadState } from '../utils/saveLocal'
import Survey from './Survey'

const User = ({ phone }) => {
  const [newUser, registerUser] = useState(loadState('existingUser'))
  const [phoneNumber] = useState(phone.replace(/[- )(]/g, ''))
  const [sex, setSex] = React.useState('female');
  const onSubmit = async (value) => {
    const userFields = { phoneNumber, ...value, sex }
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
    return <Survey user={newUser} />
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
          options={['female', 'male']}
          value={sex}
          onChange={(event) => setSex(event.target.value)}
        />
        <BiggerButton type="submit" primary label="Submit" style={{display: 'initial', marginBottom: '0rem' }} />
        <div style={{marginTop: '1rem'}}>
          <Text size="xsmall">By clicking submit, you acknowledge that your answers may be used for research purposes. However, answers will not be linked to your identifying information, all of which will be kept confidential.</Text>
        </div>
      </Form>
    </Fragment>
  )
}

export default User
