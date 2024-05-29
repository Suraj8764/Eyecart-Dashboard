import React from "react";
import { Card, Button, Carousel, Row, Col } from "react-bootstrap";
import Rating from '../components/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext";
import PaginatedProductList from "../components/Pagination";

const Productscreen = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart(); 

  const addCartHandler = (product, quantity) => {
    addToCart(product, quantity);
    navigate(`/cart/${product._id}?qty=${quantity}`);
  };

  const buttonStyle = {
    borderRadius: '20px',
    backgroundColor: 'blue',
    borderColor: 'blue',
    position: "absolute",
    right: "10%",
    top: "90%",
    transform: "translateY(-50%)",
    opacity: "0.8", 
    fontSize: "10px", 
    padding: "5px 10px" 
  };

  return (
    <Row>
      {products?.map((product) => {
        const totalQuantityInCart = cartItems?.reduce((total, item) => {
          if (item?.product?._id === product?._id) {
            return total + item.quantity;
          }
          return total;
        }, 0);

        return (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <div className="product-card">
              <Card className='my-3 p-3 rounded' style={{ width: '12rem', height: '100%', position: 'relative' }}>
                <Link to={`/product/${product._id}`}>
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <Carousel>
                      {product?.image?.map((imgUrl, index) => (
                        <Carousel.Item key={index}>
                          <img 
                            className="d-block w-100"
                            src={imgUrl}
                            alt={`Slide ${index + 1}`}
                            style={{ 
                              width: '100%', 
                              height: '200px', 
                              objectFit: 'inherit'
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </Link>

                <Card.Body>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <Card.Title as="div">
                      <strong style={{ fontSize: "12px", fontStyle: "italic" }}>{product.title}</strong>
                    </Card.Title>
                    <Card.Title as="div">
                      <strong style={{ fontSize: "12px", fontStyle: "italic" }}>Size:{product.size}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.reviews} reviews`} />
                  </Card.Text>
                  <Card.Text as="div">
                    ${product.price}
                  </Card.Text>
                  <Button variant="primary" onClick={() => addCartHandler(product, 1)} style={buttonStyle}>
                    ADD {totalQuantityInCart > 0 && `(${totalQuantityInCart})`}
                  </Button>
                </Card.Body>
              </Card>
             
            </div>
          </Col>
        );
      })}
    </Row>
    
  );
}

export default Productscreen;
