import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const StyledNavLink = styled(Nav.Item)`
  margin-left: 20px;
  &.active {
    font-weight: bold;
    background-color: lightgray;
    padding: 18px 10px 15px 10px;
    margin: -17px 0px -16px 10px;
    color: black;
  }
  &.welcome {
    color: lightgreen;
    font-weight: bold;
    background-color: transparent;
  }
  &:hover {
    color: green;
  }
  @media(max-width: 576px) {
    &.active {
      background-color: transparent;
    }
  }
`;

const NavMenu = (props) => {
  const { isLoggedIn, email, location: { pathname } } = props;
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="mr-auto">
      <Navbar.Brand>
        My App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="text-white">
          <LinkContainer exact to="/">
            <StyledNavLink>
              Home
            </StyledNavLink>
          </LinkContainer>
          {
            isLoggedIn
              ? (
                <Fragment>
                  <LinkContainer exact to="/">
                    <StyledNavLink
                      className={(pathname === '/') ? 'welcome' : null}
                    >
                      Welcome
                      {' '}
                      {email}
                    </StyledNavLink>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <StyledNavLink
                      className={pathname === '/logout' ? 'active' : null}
                    >
                      Logout
                    </StyledNavLink>
                  </LinkContainer>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <StyledNavLink className={(pathname === '/signup') ? 'active' : null}>
                      Signup
                    </StyledNavLink>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <StyledNavLink className={(pathname === '/login') ? 'active' : null}>
                      Login
                    </StyledNavLink>
                  </LinkContainer>
                </Fragment>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavMenu.defaultProps = {
  pathname: '',
};

NavMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  pathname: PropTypes.string,
};

export default NavMenu;
