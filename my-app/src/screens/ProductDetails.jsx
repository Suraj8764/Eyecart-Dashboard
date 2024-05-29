import React, { useState } from "react";
import { Row, Col, Carousel, ListGroup, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/productContext";
import { useSingleProduct } from '../context/singleProductContex'
import { useCart } from "../context/cartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const allProducts = useProducts();
  const singleProduct = useSingleProduct();
  const { addToCart } = useCart(); 
  const navigate = useNavigate();


  const product = allProducts.find((product) => product._id === id) || singleProduct;
 


  const [quantity, setQuantity] = useState(1);

  const addCartHandler = () => {
    const cartItem = {
      product: product,
      quantity: quantity
    };
    // Store the updated cart items array in local storage
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    addToCart(product, quantity);
    navigate(`/cart/${id}?qty=${quantity}`);
  };

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <Row>
      <Col md={6}>
        <Carousel>
          {product?.image?.map((imgUrl, index) => (
            <Carousel.Item key={index}>
              <img 
                className="d-block w-100"
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '40vh', 
                  objectFit: 'initial'
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={6}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            Description: {product?.specs?.join(', ')}
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>
            {/* Conditionally render 'In Stock' or 'Out of Stock' based on product availability */}
            {product.inStock > 0 ? "In Stock" : "Out of Stock"}
          </ListGroup.Item>
          <ListGroup.Item>
            {/* Quantity dropdown */}
            <Form.Group controlId="quantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                as="select"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(product.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            {/* Add to Cart button */}
            <Button
              variant="primary"
              onClick={addCartHandler}
              disabled={product.inStock === 0}
            >
              Add to Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductDetails;
