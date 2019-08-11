import React, { useState, Fragment, useEffect } from 'react'
import { Button, FormField, Text } from 'grommet'
import axios from "axios"
import GetGif from '../utils/getGif'


const ShowResult = ({ result, comparedResult }) => {
  console.log(result, "RESUL:T")
  return (
    <Fragment>
      <Text>
        You scanned
        {' '}
      </Text>
      <Text>
        {result.firstName.charAt(0).toUpperCase() + result.firstName.slice(1)}
      </Text>
    <img style={{maxWidth: '-webkit-fill-available' }} src={GetGif(.6)} />
    </Fragment>
  )
}

export default ShowResult
