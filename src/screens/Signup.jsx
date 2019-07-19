import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import API from '../utils/API';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      redirect: false,
      email: '',
      password: '',
      errorMessage: '',
    };
    this.source = {};
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
  }

  // cancels API requests
  componentWillUnmount = () => API.cancelRequest(this.source);

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleRedirect = () => this.setState({ redirect: true });

  // Method to register a new user
  register = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    API
      .register({ email, password }, this.source)
      .then((res) => {
        this.setState({
          success: res.data,
          errorMessage: '',
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.message,
          password: '',
        });
      });
  }

  render() {
    const {
      success,
      email,
      password,
      redirect,
      errorMessage,
    } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    // If Signup was a success, take user to the Login page
    if (success) {
      setTimeout(this.handleRedirect, 1500);
    }

    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Form>
            <h3>Sign Up!</h3>
            <Form.Group>
              <Form.Label htmlFor="email">
                Email
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                />
              </Form.Label>
              <Form.Text className="text-muted">
                <span id="emailHelp">Enter your email</span>
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">
                Password
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                />
              </Form.Label>
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-success"
              onClick={this.register}
            >
              Sign Up
            </Button>
          </Form>
        </Row>
        <Row className="justify-content-center">
          {
            success
            && (
            <p className="bg-info text-white font-weight-bold">
              Signup Successful! Will be redirected to Login Page shortly.
            </p>
            )
          }
          {
            errorMessage
            && (
              <p className="bg-danger text-white font-weight-bold">
                {errorMessage}
              </p>
            )
          }
        </Row>
      </Container>
    );
  }
}

export default Signup;
