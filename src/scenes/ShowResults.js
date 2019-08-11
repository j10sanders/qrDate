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

const ShowResult = ({ user, results }) => {
  return (
    <Fragment>
      {user}
      {results}
    </Fragment>
  )
}

export default ShowResult
