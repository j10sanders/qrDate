import React, { Fragment, useState, useEffect } from 'react'
import { Button, FormField, Form } from 'grommet'
import axios from "axios"
import ScanOrShow from './ScanOrShow'

const Survey = () => {
  const [hasError, setErrors] = useState(false)
  const [suveryQs, setQs] = useState([])
  const surveyId = 1

  const getSurvey = async () => {
    const res = await axios.get(`https://qrmatch.herokuapp.com/survey/${surveyId}`)
    if (!res.data) {
      debugger
    }
    if (res.data.survey){
      setQs(res.data.survey.questionJson)
    }
  }
  
  useEffect(() => {
    getSurvey()
  })

  const onSubmit = value => {
    console.log(value)
    debugger
  }

  return (
    <Fragment>
      <Form onSubmit={({ value }) => onSubmit(value)}>
        <FormField label="survey" name="test" required />
      </Form>
    </Fragment>
  )
}

export default Survey
