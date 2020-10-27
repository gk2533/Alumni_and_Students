import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import { Container, Nav, Navbar, Form, FormControl, Col , InputGroup, Button } from 'react-bootstrap';
import './style.css';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { authUser, setAuthUser } = useContext(AuthContext);

  const logoutUser = (event) => {
    event.preventDefault();
    document.cookie = 'x-auth-token= ; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete Axios.defaults.headers.common['x-auth-token'];
    setAuthUser({
      action: 'LOGOUT_USER',
      payload: null
    });
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Alumni & Students</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <a href="#" onClick={logoutUser}>
          Log Out
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
}
