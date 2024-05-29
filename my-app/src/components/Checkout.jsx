import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CheckoutContext } from "../context/checkoutContext";
import {OrderSuccess} from "../screens/PlaceOrder"
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate=useNavigate();
  const {
    shippingInfo,
    setShippingInfo,
    billingInfo,
    setBillingInfo,
    paymentInfo,
    setPaymentInfo,
  } = useContext(CheckoutContext);

  const [copyShippingToBilling, setCopyShippingToBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckboxChange = () => {
    setCopyShippingToBilling(!copyShippingToBilling);
    if (!copyShippingToBilling) {
      setBillingInfo({ ...shippingInfo });
    } else {
      setBillingInfo({
        fullName: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (paymentMethod === 'PhonePe') {
      try {
        const response = await axios.post('/api/phonepe-payment', {
          amount: 5000, 
          merchantId: 'your-phonepe-merchant-id',
          merchantTransactionId: 'unique-transaction-id',
          merchantUserId: 'unique-user-id',
          callbackUrl: 'http://localhost:3000/callback'
        });

        if (response.data.success) {
          window.location.href = response.data.redirectUrl;
        } else {
          console.error('PhonePe payment initiation failed');
        }
      } catch (error) {
        console.error('Failed to initiate PhonePe payment', error);
      }
    } else {
      try {
        const response = await axios.post('/api/checkout', {
          shippingInfo,
          billingInfo,
          paymentInfo,
          paymentMethod,
        });
        if(response){
          toast.success("order placed")
          navigate("/order")
        }
        console.log(response.data.message);
      } catch (error) {
        toast.error("order not placed for some reason check it")
        console.error('Failed to save checkout information', error);
      }
    }
  };

  return (
    <Container>
      <ToastContainer/>
      <h1 className="my-4">Checkout</h1>
      <Row>
        <Col md={6}>
          <h2>Shipping Information</h2>
          <Card border="primary" className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="shippingFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={shippingInfo.fullName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="shippingAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, address: e.target.value })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="shippingCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="shippingState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="shippingPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your postal code"
                    value={shippingInfo.postalCode}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="shippingCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    value={shippingInfo.country}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, country: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Continue to Shipping
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h2>Billing Information</h2>
          <Card border="primary" className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="billingFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={billingInfo.fullName}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, fullName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="billingAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={billingInfo.address}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, address: e.target.value })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="billingCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={billingInfo.city}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, city: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="billingState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your state"
                        value={billingInfo.state}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, state: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="billingPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your postal code"
                    value={billingInfo.postalCode}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, postalCode: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="billingCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    value={billingInfo.country}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, country: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="copyShippingToBilling" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Same as Shipping Information"
                  checked={copyShippingToBilling}
                  onChange={handleCheckboxChange}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Continue to Billing
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Payment Information</h2>
          <Card border="primary">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your card number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                    }
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ced4da",
                      padding: "10px",
                      boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="expiryDate">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YYYY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="paymentMethod" className="mb-3">
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="PhonePe"
                    name="paymentMethod"
                    value="PhonePe"
                    checked={paymentMethod === 'PhonePe'}
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Google Pay"
                    name="paymentMethod"
                    value="Google Pay"
                    checked={paymentMethod === 'Google Pay'}
                    onChange={handlePaymentMethodChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Continue Payment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
