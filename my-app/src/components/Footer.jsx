import React from 'react'
import { Row,Col, Container } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col md={12} className='text-center'>
                <span className='footer'>Copyrights@EyeCart</span>
                
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
