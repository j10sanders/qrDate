import React from 'react'
import { Grommet, Box, FormField } from 'grommet';
import { Row, Col, Container } from 'react-bootstrap'
import ScanOrShow from './scenes/ScanOrShow';
import PhoneInput from './scenes/PhoneInput';
import NewUser from './scenes/NewUser';
import Survey from './scenes/Survey';
// import Spinner from './components/Spinner'

const theme = {
  global: {
    colors: {
      brand: '#770087',
      active: '#E413C3',
      border: {
        active: '#E413C3',
      },
      focus: '#E413C3',
    },
    formField: {
      border: {
        color: '#E413C3'
      }
    }
  }
}
const App = () => {
  return (
    <Grommet theme={theme}>
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
            <Col style={{minHeight: '-webkit-fill-available'}}>
              <div style={{ paddingTop: '5rem' }}>
                <PhoneInput />
                {/* <Survey /> */}
                {/* <ScanOrShow /> */}
              </div>
            </Col>
          </Row>
        </Container>

      </Box>
    </Grommet>
  )
}

export default App 
