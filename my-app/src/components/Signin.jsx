import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Toast,ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/signin', data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if(response){
        toast.success("Login suceesfully!")
      }
      
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container>
      <ToastContainer/>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="border p-4">
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email')}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </Form.Group>
            <div className="text-center m-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
          <div>
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
