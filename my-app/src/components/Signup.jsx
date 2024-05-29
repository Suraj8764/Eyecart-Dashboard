import React, { useContext, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { SignUpContext } from "../context/SignUpContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\d+$/, 'Phone number must be digits only').required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  education: yup.array().min(1, 'At least one education is required'),
  image: yup.mixed().required('Image is required'),
});

const SignUpForm = () => {
  const { formData, setFormData } = useContext(SignUpContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value) => setFormData(value));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const registerUser = async () => {
    try {
      const response = await axios.post("/api/register", formData);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
    setValue('image', file);
  };

  return (
    <Container style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <ToastContainer />
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit(registerUser)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            {...register('phone')}
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              inline
              label="Male"
              type="radio"
              value="male"
              {...register('gender')}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              value="female"
              {...register('gender')}
            />
            {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
          </div>
        </Form.Group>

        <Form.Group controlId="education">
          <Form.Label>Education</Form.Label>
          <div>
            <Form.Check
              inline
              label="High School"
              type="checkbox"
              value="High School"
              {...register('education')}
            />
            <Form.Check
              inline
              label="Bachelor's"
              type="checkbox"
              value="Bachelor's"
              {...register('education')}
            />
            <Form.Check
              inline
              label="Master's"
              type="checkbox"
              value="Master's"
              {...register('education')}
            />
            {errors.education && <p style={{ color: 'red' }}>{errors.education.message}</p>}
          </div>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
          {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
        </Form.Group>

        <Button className='m-3' variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      <Row className="mt-3">
        <Col>
          <p>Already have an account? <Link to="/signin">Login</Link></p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
