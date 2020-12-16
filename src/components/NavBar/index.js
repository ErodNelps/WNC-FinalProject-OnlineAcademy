import React, { Component, useState} from 'react';
import {Navbar, NavItem, Icon, Dropdown, Divider} from 'react-materialize'
import 'materialize-css'
import './style.css'

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
        brand={<a className="brand-logo" href="#">Online Academy</a>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}>
  <NavItem href="">
    Getting started
  </NavItem>
  <NavItem href="components.html">
    Components
  </NavItem>
  <DropdownMenu></DropdownMenu>
</Navbar>
      </div>
    </React.Fragment>
  );
}

function DropdownMenu(){
  const [open, setDropdown] = useState(false);
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