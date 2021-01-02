import React from 'react';
import {Navbar, Icon, Dropdown, Divider} from 'react-materialize'
import 'materialize-css'
import AuthOptions from '../App/authOptions'
import './style.css'

export default function NavBar() {
  
  return (
    <React.Fragment>
      <div>
        <Navbar
          alignLinks="right"
          className="nav-menu"
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
          <AuthOptions></AuthOptions>
        </Navbar>
      </div>
    </React.Fragment>
  );
}

function DropdownMenu(){
    return (
      <Dropdown
    id="Dropdown_cat"
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
    }} trigger={<a href="/category">Category</a>}>
    <a href="/">IT</a>
    <Divider/>
  </Dropdown>)
}