import React, { Component, useState} from 'react';
import {Navbar, NavItem, Icon, Dropdown, Divider, Button} from 'react-materialize'
import 'materialize-css'
import './style.css'
import { NavLink } from 'react-router-dom';

export default function NavBar(props) {
  
  return (
    <React.Fragment>
      <div>

      {/* <nav className="NavbarItems">
        <h1 className="navbar-logo">Online Academy <i className="fab fa-react"></i></h1>
        <div className="menu-icon" onClick={this.handleClick}><i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i></div> 
        <ul className="nav-menu">
        </ul>
      </nav> */}
      <Navbar
        alignLinks="right"
        brand={<a className="brand-logo" href="/">Online Academy</a>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: false,
          edge: 'right',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}>
  <DropdownMenu></DropdownMenu>
  <Button node="a" href="/register">
    Sign up
  </Button>
  <Button node="a" href="/login">
    Log in
  </Button>
</Navbar>
      </div>
    </React.Fragment>
  );
}

function DropdownMenu(){
    return (
      <Dropdown
    id="Dropdown_6"
    options={{
      alignment: 'left',
      autoTrigger: true,
      closeOnClick: false,
      constrainWidth: true,
      container: null,
      coverTrigger: false,
      hover: true,
      inDuration: 150,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 250
    }} trigger={<a href="#!">Category</a>}
    children={<a href="#!">Category</a>, <a href="#!">Category</a>}
    >
    <a href="#">IT</a>
    <Divider/>
  </Dropdown>)
}