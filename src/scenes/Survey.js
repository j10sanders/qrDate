import React, { Fragment, useState } from "react";
import { Select, Text, Form } from "grommet";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BiggerButton, StyledField } from "../components/MyStyledComponents";
import QrRender from "../components/QR-render";
import { saveState } from "../utils/saveLocal";
import survey from "../utils/survey";

const Survey = ({ user }) => {
  const [surveyAs, setAs] = useState([]);
  const [answersJson, setAnswersJson] = useState([]);
  const surveyId = process.env.REACT_APP_SURVEY_ID || 1;

  const onSubmit = async () => {
    const qs = survey.data.map(q => {
      return q.question;
    });
    const answers = qs.map((x, i) => {
      return { [i]: surveyAs[i][1] };
    });
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
      `https://qrmatch.herokuapp.com/user/${user.phoneNumber}`
    );
    saveState("existingUser", fullUser.data);
  };

  const updateAs = (val, index, choices) => {
    const As = [...surveyAs];
    As[index] = [val, choices.indexOf(val)];
    setAs(As);
  };

  if (survey.length === 0) {
    return <Spinner />;
  }

  if (answersJson.length !== 0) {
    return <QrRender qAndAs={answersJson} user={user} />;
  }

  return (
    <Fragment>
      <Text alignSelf="center" size="xlarge" color="#B300B3">
        Answer the below questions:
      </Text>
      <Form onSubmit={onSubmit}>
        {survey.data.map((q, i) => (
          <StyledField
            label={q.question}
            name={q.question}
            key={q.question}
            required={!surveyAs[i]}
          >
            <Select
              options={q.answers}
              onChange={({ option }) => updateAs(option, i, q.answers)}
              value={surveyAs[i] && surveyAs[i][0]}
            />
          </StyledField>
        ))}
        <BiggerButton
          type="submit"
          label="Submit"
          primary
          style={{ marginTop: "3rem" }}
          // disabled={surveyAs.length !== survey.data.length}
        />
      </Form>
    </Fragment>
  );
};

export default Survey;
