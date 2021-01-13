import React, { useState, useEffect } from 'react';
import {Navbar, Icon } from 'react-materialize'
import { Form, FormControl } from 'react-bootstrap'
import Dropdown from 'react-multilevel-dropdown'
import 'materialize-css'
import AuthOptions from '../App/authOptions'
import './style.css'
import {fetchAllCategory} from '../../redux/category'
import {connect } from 'react-redux'
import store from '../../redux/store'

const NavBar = ({categories = []}) => {
  const [searchText, setSearchText] = useState();
  useEffect(() => {
    store.dispatch(fetchAllCategory());
  }, [])
  async function handleSubmit(event) {
    event.preventDefault();
  }

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
          <Dropdown menuClassName="dropdown-menu" wrapperClassName="dropdown-wrapper" buttonClassName="dropdown-button" className="dropdown" title='Category'>
            {categories ? <>{categories.map((category, index) => (
            <Dropdown.Item className="dropdown-item" href="/" key={index} name={category.category}>{category.category}
              <SubMenu subcats={category.subCategories}></SubMenu>
            </Dropdown.Item>))}</> : <></>}
          </Dropdown>
          <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <AuthOptions></AuthOptions>
        </Navbar>
      </div>
    </React.Fragment>
  );
}

function SubMenu({subcats = []}){
    return (
      <Dropdown.Submenu>
        {subcats.map((category, index) => (
        <Dropdown.Item href="/" key={index} name={category.name}>{category.name}</Dropdown.Item>))}
      </Dropdown.Submenu>)
}

const mapStateToProps = state => {
  const categories =  state.categoryReducer.categories;
  console.log(categories)
  return {
      categories
  }
}

export default connect(mapStateToProps)(NavBar)