import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import Productscreen from '../screens/Productscreen'

const PaginatedProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  
  const productArray = Array.isArray(products) ? products : [];

  const totalPages = Math.ceil(productArray.length / itemsPerPage);

  const paginatedProducts = productArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <Row>
        {paginatedProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Productscreen product={product} />
          </Col>
        ))}
      </Row>
      <Pagination className='justify-content-center'>
        {[...Array(totalPages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === currentPage}
            onClick={() => handleClick(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default PaginatedProductList;
