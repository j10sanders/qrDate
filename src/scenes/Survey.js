import React, { Fragment, useState, useEffect } from 'react'
import { Button, Select } from 'grommet'
import axios from "axios"
import Spinner from '../components/Spinner'
import { StyledField } from './NewUser'
import QrRender from '../components/QR-render'
import { saveState } from '../utils/saveLocal'

const Survey = ({ user }) => {
  const [hasError, setErrors] = useState(false)
  const [surveyQs, setQs] = useState([])
  const [surveyAs, setAs] = useState(new Array(3))
  const [answersJson, setAnswersJson] = useState([])
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

  const onSubmit = async () => {
    const qs = surveyQs.surveyFields.questionsJson.data.map(q => {
      return q.question
    })
    const answers = qs.map((x, i) => {
      return {[x]: surveyAs[i]}
    })
    setAnswersJson(answers)
    const payload = {
      responseFields: {
        surveyId: 2,
        type: "survey",
        userId: user.id, 
        answersJson: answers
      }
    }
    const res = await axios.post(`https://qrmatch.herokuapp.com/response`, payload)
    console.log(res)
    // haven't tried the stuff below yet
    // const myUser = await axios.get(`https://qrmatch.herokuapp.com/${user.phoneNumber}`)
    // console.log(myUser.data)
    // const newLocalState = saveState('myUser', myUser.data)
  }

  const updateAs = (val, index) => {
    const As = [...surveyAs]
    As[index] = val
    setAs(As)
  }
  

  if (surveyQs.length === 0) {
    return <Spinner />
  }

  if (answersJson.length !== 0) {
    return <QrRender data={JSON.stringify(answersJson)} />
  }

  return (
    <Fragment>
      {surveyQs.surveyFields.questionsJson.data.map((q, i) => (
        <StyledField label={q.question} name={q.question} required key={q.question}>
          <Select options={q.answers} onChange={({ option }) => updateAs(option, i)} placeholder={q.answers[0]} value={surveyAs[i]} />
        </StyledField>
      ))}
      <Button onClick={onSubmit} label="Submit" primary style={{ marginTop: '3rem' }} />
    </Fragment>
  )
}

export default Survey
