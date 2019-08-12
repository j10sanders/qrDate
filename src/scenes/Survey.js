import React, { Fragment, useState, useEffect } from "react";
import { Button, Select } from "grommet";
import axios from "axios";
import Spinner from "../components/Spinner";
import { StyledField } from "./NewUser";
import QrRender from "../components/QR-render";
import { saveState } from "../utils/saveLocal";

const Survey = ({ user, phoneNumber }) => {
  const [hasError, setErrors] = useState(false);
  const [surveyQs, setQs] = useState([]);
  const [surveyAs, setAs] = useState(new Array(3));
  const [answersJson, setAnswersJson] = useState([]);
  const surveyId = 3;

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
                "Gifts",
                "Physical Touch",
                "Can people stop bringing up love languages? Mine change by the day"
              ]
            },
            {
              question: "My idea of the perfect pet is ___? ",
              answers: [
                "Anything loyal, fluffy, and loving",
                "Anything I can dress up and fit in my bag",
                "Anything low maintenance that can survive a few days if I forget to feed it",
                "A pet?! I can barely take care of myself"
              ]
            },
            {
              question: "My view on relationship is ___? ",
              answers: [
                "They are either meant to be or they’re not",
                "They require constant work and revisiting of joint goals",
                "They save me from having to make awkward conversation at dinner parties and weddings"
              ]
            },

            {
              question:
                "If you’ve just been given a one time gift of $10,000, you would____",
              answers: [
                "Donate it to a noteworthy cause",
                "Put it in the bank or invest it. Planning for the future is important",
                "Spend it and enjoy; there’s no time like the present",
                "Buy shots for everyone at this bar"
              ]
            },
            {
              question: "My idea of the perfect Sunday is _____",
              answers: [
                "Getting up early and checking items off my to do list",
                "Going on an adventure, which may involve exploring a new part of town or going on a trip",
                "Lounging in pajamas all day and watching reruns",
                "Brunch! It’s Sunday Funday!"
              ]
            },
            {
              question: "I’m looking for ________",
              answers: [
                "A life-long partner",
                "A casual date",
                "A great friend",
                "The exit. I didn’t realize there was an event at this bar tonight."
              ]
            },

            {
              question: "On the weekdays, my alarm ______ ",
              answers: [
                "Is set to a time between 6 and 8am. It depends if I have an early morning meeting",
                "Is set at 10-minute intervals for an hour, because I like to hit snooze",
                "Goes off five minutes before I need to be out the door",
                "Is nonexistent. I don’t usually have anywhere to be until late afternoon."
              ]
            },
            {
              question: "The holidays makes me feel _________ ",
              answers: [
                "Anxious. There are a lot of people that I have been avoiding since the last family gathering",
                "Excited. I can’t wait for a reason for everyone I love to be in one place",
                "Stressed. I usually have trouble balancing family time with work",
                "Lonely, because even though I want to, I am often unable to travel home"
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
              question: "My perfect partner ________.",
              answers: [
                "Is always by my side",
                "Does his/her own thing, but is always home to tuck me in at night",
                "Knows how to balance time with me and time with friends",
                "Is not usually around"
              ]
            },
            {
              question: "My perfect vacation is ________.",
              answers: [
                "Something adventurous (i.e., a climbing, skiing, etc.)",
                "Something relaxing (i.e., a beach, or somewhere poolside)",
                "Something educational (i.e., a trip packed with cultural experiences and language or cooking classes)",
                "Anywhere that doesn’t involve a plane"
              ]
            },
            {
              question:
                "If at the door of the plane when sky diving, I want my partner to",
              answers: [
                "Be ready to jump with me- this is an awesome date!",
                "Push me out, because even though I wanted to do this, I sometime get nervous when it’s time to act",
                "Wake me up! This is an insane nightmare. Why am I here?"
              ]
            },

            {
              question: "Family is ________",
              answers: [
                "Everything. I try to see my relative as much as possible.",
                "A once a year obligation",
                "Important, but I try to balance time with them and with my friends."
              ]
            },
            {
              question: "Kids are ________",
              answers: [
                "Amazing. I would like to have a large family.",
                "Great, I would like to have one or two. ",
                "Not on the radar now, but up for consideration if I find the right partner.",
                "Not something that I would ever consider."
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
              question: "When it comes to learning, I believe ________",
              answers: [
                "We should constantly seek knowledge, as we are all lifelong learners",
                "That we should study whatever we need to help us get ahead",
                "That it’s best left in the past with formal schooling"
              ]
            },
            {
              question: "When it comes to money, my partner and I ________",
              answers: [
                "Should split everything down the middle for the duration of our relationship",
                "Should pay for our own expenses and negotiate when it comes to items, we purchase together",
                "Should combine our money and pay from a joint account ",
                "Have decided that the person who earns more will pay for everything"
              ]
            },
            {
              question: "I envision my wedding as being ________",
              answers: [
                "A large, traditional, family affair",
                "A celebration focusing on our friends",
                "An intimate gathering with only those close to us",
                "Far in the future; that’s as much as I have thought about it."
              ]
            },

            {
              question:
                "When it comes to politics, I am interested in someone ________",
              answers: [
                "Who is active and involved in grassroots efforts",
                "Who keeps up to date with the news and has an informed, educated opinion",
                "Who is as apathetic as I am"
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
      return { [x.charAt(0)]: surveyAs[i][1] };
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
      {surveyQs.surveyFields.questionsJson.data.map((q, i) => (
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
