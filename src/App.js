import React from 'react'
import { Grommet } from 'grommet';
import { Row, Col, Container } from 'react-bootstrap'
import ScanOrShow from './scenes/ScanOrShow';
import PhoneInput from './scenes/PhoneInput';
import NewUser from './scenes/NewUser';
import Survey from './scenes/Survey';
// import Spinner from './components/Spinner'

const App = () => {
  return (
    <Grommet>
      <Container>
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            {/* <PhoneInput /> */}
            {/* <Spinner /> */}
            {/* <ScanOrShow />
            <NewUser /> */}
            <Survey />
          </Col>
        </Row>
      </Container>
    </Grommet>
  )
}

export default App 
