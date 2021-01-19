import React, { useState, useEffect } from 'react';
import {Navbar, Icon } from 'react-materialize'
import Dropdown from 'react-multilevel-dropdown'
import 'materialize-css'
import AuthOptions from '../App/authOptions'
import './style.css'
import {fetchAllCategory} from '../../redux/category'
import {connect } from 'react-redux'
import store from '../../redux/store'
import { Link, useHistory } from 'react-router-dom';

const NavBar = ({categories = []}) => {
  const [searchText, setSearchText] = useState();
  useEffect(() => {
    store.dispatch(fetchAllCategory());
  }, [])
  const history = useHistory()
  function keyPress(e){
    if(e.charCode === 13){
       let query = "/search?q=" + e.target.value;
       history.push(query)
    }
 }

  return (
    <React.Fragment>
      <div>
        <Navbar
          alignLinks="right"
          className="nav-menu"
          brand={<Link className="brand-logo" to="/">Online Academy</Link>}
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
            {categories ? <>{categories.map((category, index) => (<Link to={"/category/" + `${category.category}`} key={index}>
              <Dropdown.Item className="dropdown-item"  key={index} name={category.category}>{category.category} 
              <SubMenu subcats={category.subCategories} key={index}></SubMenu>
            </Dropdown.Item></Link>))}</> : <></>}
          </Dropdown>
          {/* <Form inline>
              <FormControl type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" className="mr-sm-2" onKeyPress={keyPress}/>
          </Form> */}
          <div className="search-bar">
            <input type="text" name="query" value={ searchText } id="search" placeholder="Search..." onKeyPress={keyPress}/>
          </div>
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
        <Link key={index} style={{backgroundColor: "transparent", color: "#111111"}} to={"/subcategory/"+`${category.name}`}><Dropdown.Item  key={index} name={category.name}>{category.name}</Dropdown.Item></Link>))}
      </Dropdown.Submenu>)
}

const mapStateToProps = state => {
  const categories =  state.categoryReducer.categories;
  return {
      categories
  }
}

export default connect(mapStateToProps)(NavBar)