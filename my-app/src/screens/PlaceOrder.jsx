import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="text-center mt-5">
            <Card.Body>
              <Card.Title>Order Placed Successfully!</Card.Title>
              <Card.Text>
                Thank you for your purchase. Your order has been placed successfully.
              </Card.Text>
              <Button variant="primary" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
