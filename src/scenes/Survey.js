import React, { Fragment, useState, useEffect } from "react";
import { Button, Select } from "grommet";
import axios from "axios";
import Spinner from "../components/Spinner";
import { StyledField } from "./NewUser";
import QrRender from "../components/QR-render";
import { saveState } from "../utils/saveLocal";
import survey from '../utils/survey'

const Survey = ({ user, phoneNumber }) => {
  const [hasError, setErrors] = useState(false);
  const [surveyQs, setQs] = useState(survey);
  const [surveyAs, setAs] = useState(new Array(3));
  const [answersJson, setAnswersJson] = useState([]);
  const surveyId = 4;

  // const getSurvey = async () => {
  //   // const res = await axios.get(`https://qrmatch.herokuapp.com/survey/${surveyId}`)
  //   // if (!res.data) {
  //   //   debugger
  //   // }
  //   // if (res.data.survey){
  //   //   setQs(res.data.survey.questionJson)
  //   // }
    
  //   setQs(exampleSurvey);
  // };

  // useEffect(() => {
  //   getSurvey();
  // }, []);

  const onSubmit = async () => {
    const qs = surveyQs.data.map(q => {
      return q.question;
    });
    const answers = qs.map((x, i) => {
      return { [i]: surveyAs[i][1] };
    });
    console.log(answers, "answers")
    debugger
    setAnswersJson(answers);
    const payload = {
      responseFields: {
        surveyId,
        type: "survey",
        userId: user.id,
        answersJson: answers
      }
    };
    const res = await axios.post(
      `https://qrmatch.herokuapp.com/response`,
      payload
    );
    if (!res.data) {
      debugger;
    }
    const fullUser = await axios.get(
      `https://qrmatch.herokuapp.com/user/${phoneNumber}`
    );
    saveState("existingUser", fullUser.data);
  };

  const updateAs = (val, index, choices) => {
    const As = [...surveyAs];
    As[index] = [val, choices.indexOf(val)];
    setAs(As);
  };

  if (surveyQs.length === 0) {
    return <Spinner />;
  }

  if (answersJson.length !== 0) {
    return <QrRender qAndAs={answersJson} user={user} />;
  }

  return (
    <Fragment>
      {surveyQs.data.map((q, i) => (
        <StyledField
          label={q.question}
          name={q.question}
          required
          key={q.question}
        >
          <Select
            options={q.answers}
            onChange={({ option }) => updateAs(option, i, q.answers)}
            value={surveyAs[i] && surveyAs[i][0]}
          />
        </StyledField>
      ))}
      <Button
        onClick={onSubmit}
        label="Submit"
        primary
        style={{ marginTop: "3rem" }}
      />
    </Fragment>
  );
};

export default Survey;
