import React from 'react'
import { Grommet } from 'grommet';
import { Row, Col, Container } from 'react-bootstrap'
import ScanOrShow from './scenes/ScanOrShow';
import PhoneInput from './scenes/TakeQuiz';

const App = () => {
  return (
    <Grommet>
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <PhoneInput />
            {/* <ScanOrShow /> */}
          </Col>
        </Row>
      </Container>
    </Grommet>
  )
}

export default App 
