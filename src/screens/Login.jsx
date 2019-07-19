import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import API from '../utils/API';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.source = {};
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (isLoggedIn !== prevProps.isLoggedIn) {
      this.changeLoggedInState(isLoggedIn);
    }
  }

  componentWillUnmount = () => API.cancelRequest(this.source);

  changeLoggedInState = currentValue => this.setState({ isLoggedIn: currentValue });

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    const { email, password } = this.state;
    const { loginResult } = this.props;
    e.preventDefault();

    API
      .loginUser({ email, password }, this.source)
      .then((res) => {
        this.setState({ isLoggedIn: res.data.isLoggedIn });
        // ------------------------------------------
        // loginResult is callback function to parent
        // ------------------------------------------
        loginResult({
          email,
          isLoggedIn: res.data.isLoggedIn,
        }, '/');
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  render() {
    const { isLoggedIn, email, password } = this.state;

    // If user is logged in, take them to main page
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Form>
            <h3>Login to MyApp</h3>
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
              onClick={this.login}
            >
              Login
            </Button>
          </Form>

        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  loginResult: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
