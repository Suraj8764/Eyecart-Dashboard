import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button, Dropdown, InputGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/productContext";
import Productscreen from "../screens/Productscreen";

const Headers = () => {
  const products = useProducts();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const totalQuantityInCart = cartItems?.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className="bg-body-tertiary" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-dark">EyeCart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link><i className="fa-solid fa-house"></i> Home</Nav.Link>
              </LinkContainer>
            </Nav>
         
            <Form className="mx-auto d-flex" onSubmit={handleSearch} style={{ width: "50%" }}>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search for Products, Brands and More"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: "23px 0 0 23px" }}
                />
                <InputGroup.Text style={{ borderRadius: "0 23px 23px 0" }}>
                  <i className="fa fa-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <Nav className="ms-auto d-flex align-items-center">
              <Dropdown
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                show={showDropdown}
              >
                <LinkContainer to="/signin">
                <Dropdown.Toggle style={{ margin: "16px" }} as={Button} id="dropdown-custom-components">
                  Login
                </Dropdown.Toggle>
                </LinkContainer>
              
                <Dropdown.Menu>
                  <Dropdown.Header>New customer?</Dropdown.Header>
                  <LinkContainer to="/signup">
                    <Dropdown.Item>Sign Up</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>My Profile</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <Dropdown.Item>Orders</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/wishlist">
                    <Dropdown.Item>Wishlist</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/rewards">
                    <Dropdown.Item>Rewards</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/gift-cards">
                    <Dropdown.Item>Gift Cards</Dropdown.Item>
                  </LinkContainer>
                </Dropdown.Menu>
              </Dropdown>
               
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i>
                  {totalQuantityInCart > 0 && <span className="badge badge-light">{totalQuantityInCart}</span>}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Productscreen products={filteredProducts} />
      </Container>
    </>
  );
};

export default Headers;
