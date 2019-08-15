import React, { useState, Fragment, useEffect } from 'react'
import { Button, FormField, Text, Meter, Box, Stack } from 'grommet'
import axios from "axios"
import GetGif from '../utils/getGif'

const Ordinal_suffix_of = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

const ShowResult = ({ result, comparedResult, fromUserId, surveyId }) => {
  const [rank, setRank] = useState()
  const [totalPlayers, setTotalPlayers] = useState()
  const [sharedAnswers, setSharedAnswers] = useState()

  useEffect(() => {
    const compare = async () => {
      const res = await axios.post(`https://qrmatch.herokuapp.com/compare`, { fromUserId, toUserId: result.userId, surveyId: 4 })
      const { data } = res || {}
      if (data) {
        setRank(data.rank)
        setTotalPlayers(data.totalPlayers)
        setSharedAnswers(data.sharedAnswers)
      }
    }
    compare()
  }, [])

  return (
    <Fragment>
      <Box>
        <Text alignSelf="center" size="xlarge" color="#B300B3">
          You scanned {result.firstName.charAt(0).toUpperCase() + result.firstName.slice(1)}
        </Text>
      </Box>
      {rank && (
        <div>
          <img style={{ maxWidth: '-webkit-fill-available', padding: '1rem', display: 'block', margin: 'auto' }} alt="gif" src={GetGif((totalPlayers - rank + 1) / totalPlayers)} />
          <Box align="center" pad="large">
            <Stack anchor="center" style={{ padding: '1rem' }}>
              <Meter
                thickness="small"
                alignSelf="center"
                values={[{
                  value: 100 * ((totalPlayers - rank + 1) / totalPlayers),
                  label: true,
                  color: "accent-1",
                }]}
                round
                size="xsmall"
                type="circle"
              />
              <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                <Text size="small">#</Text>
                <Text size="xlarge" weight="bold">
                  {rank}
                </Text>
              </Box>
            </Stack>
            <Text bold>You came in {Ordinal_suffix_of(rank)} out of {totalPlayers} players!</Text>
            <Box align="center" pad={{ bottom: 'xsmall', top: 'large'}}>
              
                <Text bold size="xlarge">You and XXX agree on:</Text>
              
              <div style={{display: 'block',}}>
                <Button primary label="Show Me!"/>
                {console.log(sharedAnswers)}
              </div>
            </Box>
          </Box>

        </div>
      )}
    </Fragment>
  )
}

export default ShowResult
