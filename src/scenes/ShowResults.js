import React, { useState, Fragment, useEffect } from 'react'
import { Button, FormField, Text } from 'grommet'
import axios from "axios"
import GetGif from '../utils/getGif'


const ShowResult = ({ result, comparedResult, fromUserId, surveyId }) => {
  console.log(result, "RESULT")
  useEffect(async() => {
    console.log(fromUserId, surveyId, result.userId)
    debugger
    const res = await axios.post(`https://qrmatch.herokuapp.com/compare`, {fromUserId, toUserId: result.userId, surveyId: 3 })
    console.log(res, "Result of compare")
  })
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
