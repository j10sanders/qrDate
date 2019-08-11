import React, { Fragment, useState, useEffect } from "react";
import { Button, Select } from "grommet";
import axios from "axios";
import Spinner from "../components/Spinner";
import { StyledField } from "./NewUser";
import QrRender from "../components/QR-render";
import { saveState } from "../utils/saveLocal";

const Survey = ({ user }) => {
  const [hasError, setErrors] = useState(false);
  const [surveyQs, setQs] = useState([]);
  const [surveyAs, setAs] = useState(new Array(3));
  const [answersJson, setAnswersJson] = useState([]);
  const surveyId = 1;

  const getSurvey = async () => {
    // const res = await axios.get(`https://qrmatch.herokuapp.com/survey/${surveyId}`)
    // if (!res.data) {
    //   debugger
    // }
    // if (res.data.survey){
    //   setQs(res.data.survey.questionJson)
    // }
    const exampleSurvey = {
      surveyFields: {
        name: "hello",
        status: "Active",
        questionsJson: {
          data: [
            {
              question: "Would you rather become...?",
              answers: [
                "40% Robot",
                "Live the rest of your life without technology",
                "Technology? I can barely deal with my flip phone"
              ]
            },
            {
              question: "Your go-to Bodega order",
              answers: [
                "Bacon Egg and Cheese",
                "Jamaican Patty",
                "Smoothie",
                "Deli Sandwich "
              ]
            },
            {
              question: "On a Friday night out, you can find me...",
              answers: [
                "Dancing at a Brooklyn Night Club",
                "A Jazz Bar",
                "A homey bar",
                "In bed"
              ]
            },
            {
              question: "Would you rather?",
              answers: [
                "Listen to the music of your choice but always muffled from another room",
                "Or listen in your preferred method but lose autonomy over the selection"
              ]
            },
            {
              question: "My future midlife crisis would be...",
              answers: [
                "Return to the land and start a farm in Upstate New York",
                "Have an affair",
                "Start wearing linen (only)",
                "Ayuasca trip in South America"
              ]
            },
            {
              question: "What is your love language? ",
              answers: [
                "Quality Time",
                "Acts of Service",
                "Words of Affirmation",
                "Gifts"
              ]
            },
            {
              question: "My idea of the perfect companion is ___? ",
              answers: [
                "A loyal dog",
                "An independent cat",
                "A fish, they're easy to take care of",
                "A pet? I can barely feed/clean myself"
              ]
            },
            {
              question:
                "If you’ve just been given a one time gift of $10,000, you would____",
              answers: []
            },
            {
              question: "My idea of the perfect day is _____",
              answers: [
                "A loyal dog",
                "An independent cat",
                "A fish, they're easy to take care of",
                "A pet? I can barely feed/clean myself"
              ]
            },
            {
              question: "I set my alarm clock to ______ ",
              answers: [
                "A loyal dog",
                "An independent cat",
                "A fish, they're easy to take care of",
                "A pet? I can barely feed/clean myself"
              ]
            },
            {
              question: "The holidays makes me feel _________ ",
              answers: [
                "A loyal dog",
                "An independent cat",
                "A fish, they're easy to take care of",
                "A pet? I can barely feed/clean myself"
              ]
            },
            {
              question: "The last time I prayed was  _______ ",
              answers: [
                "Last weekend at my church, temple, mosque, etc.",
                "During the major holidays; I’m only religious at certain points during the year",
                "Never. I’m not religious, but consider myself to be spiritual ",
                "Right now. Find me a match!"
              ]
            },
            {
              question: "A job should be _________________ ",
              answers: [
                "Last weekend at my church, temple, mosque, etc.",
                "During the major holidays; I’m only religious at certain points during the year",
                "Never. I’m not religious, but consider myself to be spiritual ",
                "Right now. Find me a match!"
              ]
            },
            {
              question: "When making decisions, I...",
              answers: [
                "Consult my horoscope ",
                "Carefully weigh the pros and cons of each option",
                "Go with my gut instinct",
                "Run it by my mom "
              ]
            },
            {
              question: "When making decisions, I...",
              answers: [
                "married with children doing the whole white picket fence in the suburbs thing",
                "married with children but still hustling in the city",
                "married and enjoying my time with my partner",
                "casually dating there are so many fun people to meet!"
              ]
            }
          ]
        }
      }
    };
    setQs(exampleSurvey);
  };

  useEffect(() => {
    getSurvey();
  }, []);

  const onSubmit = async () => {
    const qs = surveyQs.surveyFields.questionsJson.data.map(q => {
      return q.question;
    });
    const answers = qs.map((x, i) => {
      return { [x]: surveyAs[i] };
    });
    setAnswersJson(answers);
    const payload = {
      responseFields: {
        surveyId: 2,
        type: "survey",
        userId: user.id,
        answersJson: answers
      }
    };
    const res = await axios.post(
      `https://qrmatch.herokuapp.com/response`,
      payload
    );
    console.log(res);
    // haven't tried the stuff below yet
    // const myUser = await axios.get(`https://qrmatch.herokuapp.com/${user.phoneNumber}`)
    // console.log(myUser.data)
    // const newLocalState = saveState('myUser', myUser.data)
  };

  const updateAs = (val, index) => {
    const As = [...surveyAs];
    As[index] = val;
    setAs(As);
  };

  if (surveyQs.length === 0) {
    return <Spinner />;
  }

  if (answersJson.length !== 0) {
    return <QrRender data={JSON.stringify(answersJson)} />;
  }

  return (
    <Fragment>
      {surveyQs.surveyFields.questionsJson.data.map((q, i) => (
        <StyledField
          label={q.question}
          name={q.question}
          required
          key={q.question}
        >
          <Select
            options={q.answers}
            onChange={({ option }) => updateAs(option, i)}
            placeholder={q.answers[0]}
            value={surveyAs[i]}
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
