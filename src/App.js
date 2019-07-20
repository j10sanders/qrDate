import React from 'react'
import { Grommet } from 'grommet';
import { Row, Col, Container } from 'react-bootstrap'
import ScanOrShow from './scenes/ScanOrShow';

const App = () => {
  return (
    <Grommet>
      <Container>
        <Row>
          <Col xs={6}>
            <ScanOrShow />
          </Col>
        </Row>
      </Container>
    </Grommet>
  )
}

export default App 
