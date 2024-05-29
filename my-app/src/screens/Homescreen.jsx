import React from "react";
import { Row, Col } from "react-bootstrap";
import Productscreen from './Productscreen';
import { useProducts } from "../context/productContext";
import "../App.css"
import PaginatedProductList from '../components/Pagination'
const Homescreen = () => {
  const products = useProducts();

  return (
    <>
      <Row>
        {products.map(product => (
          <Col md={3} key={product._id} className="product-card">
            <Productscreen product={product} />
          </Col>
        ))}
            <PaginatedProductList products={products} />
      </Row>
    </>
  );
};

export default Homescreen;
