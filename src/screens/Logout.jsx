import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../utils/API';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutSuccess: false,
    };
  }

  // simply call logout function as soon as component mounts
  componentDidMount() {
    API
      .logout()
      .then(() => {
        const { logoutResult } = this.props;
        this.setState({ logoutSuccess: true });
        // -------------------------------------------
        // getLogoutResult callback function to parent
        // -------------------------------------------
        logoutResult({
          isLoggedIn: false,
          email: '',
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  render() {
    const { logoutSuccess } = this.state;
    if (logoutSuccess) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <h3>Logging out. Thank you for visiting our site.</h3>
    );
  }
}

Logout.propTypes = {
  logoutResult: PropTypes.func.isRequired,
};

export default Logout;
