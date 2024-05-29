import React from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  const goToLogin = () => {
    navigate("/signin");  
  };

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className='text-center my-5'>
          <h2>Missing Cart items?</h2>
          <p>Login to see the items you added previously</p>
          <Button variant="primary" onClick={goToLogin}>Login</Button>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.title}</td>
                <td>${item.product.price}</td>
                <td>
                  <Form.Control
                    as="select"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                  >
                    {[...Array(10).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item.product._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <Button variant="success" onClick={proceedToCheckout}>Proceed to Checkout</Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
