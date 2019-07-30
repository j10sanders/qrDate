import React, { Fragment, useState, useEffect } from 'react'
import { Button, FormField, Form, Select } from 'grommet'
import axios from "axios"
import ScanOrShow from './ScanOrShow'
import Spinner from '../components/Spinner'
import { StyledField } from './NewUser'

const Survey = () => {
  const [hasError, setErrors] = useState(false)
  const [suveryQs, setQs] = useState([])
  const surveyId = 1

  const getSurvey = async () => {
    // const res = await axios.get(`https://qrmatch.herokuapp.com/survey/${surveyId}`)
    // if (!res.data) {
    //   debugger
    // }
    // if (res.data.survey){
    //   setQs(res.data.survey.questionJson)
    // }
    const exampleSurvey = {
      "surveyFields": {
        "name": "hello",
        "status": "Active",
        "questionsJson": {
          "data": [
            {
              "question": "Would you rather become...?",
              "answers": [
                "40% Robot",
                "Live the rest of your life without technology",
                "Technology? I can barely deal with my flip phone"
              ]
            },
            {
              "question": "Your go-to Bodega order",
              "answers": [
                "Bacon Egg and Cheese",
                "Jamaican Patty",
                "Smoothie",
                "Deli Sandwich "
              ]
            },
            {
              "question": "Which drink do you prefer",
              "answers": [
                "Negroni",
                "Margarita",
                "A good old beer",
                "Glass of wine",
                "A joint"
              ]
            }
          ]
        }
      }
    }
    setQs(exampleSurvey)
  }
  
  useEffect(() => {
    getSurvey()
  }, [])

  const onSubmit = value => {
    console.log(value)
    debugger
  }

  if (suveryQs.length === 0) {
    return <Spinner />
  }
  
  // possibly just give an index with the map, and use that when storing the value in state.
  return (
    <Fragment>
      <Form onSubmit={({ value }) => onSubmit(value)}>
        {suveryQs.surveyFields.questionsJson.data.map(q => (
          <StyledField label={q.question} name={q.question} required>
            <Select options={q.answers} />
          </StyledField>
        ))}
      </Form>
    </Fragment>
  )
}

export default Survey
