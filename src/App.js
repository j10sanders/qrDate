import React from 'react'
import { Grommet, Box } from 'grommet';
import { Row, Col, Container } from 'react-bootstrap'
import ScanOrShow from './scenes/ScanOrShow';
import PhoneInput from './scenes/PhoneInput';
import NewUser from './scenes/NewUser';
import Survey from './scenes/Survey';
// import Spinner from './components/Spinner'

const App = () => {
  return (
    <Grommet>
      <Box
        // direction="row"
        border={{ color: 'brand', size: 'large' }}
        pad="small"
        // fill
        // flex
        round="small"
      >
        <Container>
          <Row>
            <Col xs={{ offset: 1 }} style={{minHeight: '-webkit-fill-available'}}>
              <div style={{ paddingTop: '5rem' }}>
                {/* <PhoneInput /> */}
                <Survey />
              </div>
            </Col>
          </Row>
        </Container>

      </Box>

      {/* <Spinner /> */}
      {/* <ScanOrShow />
            <NewUser /> */}
      {/* <Survey /> */}

    </Grommet>
  )
}

export default App 
