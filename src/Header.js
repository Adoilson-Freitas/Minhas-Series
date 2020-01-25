import React, { useState } from 'react';

import {
  Navbar,
  NavbarBrand, 
  Collapse, 
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
 } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  }

  return (
    <Navbar color='primary' light expand='md'> 
      <div className='container'>
        <NavbarBrand className='text-white' style={{fontSize: '25px'}} tag={Link} to='/'>Minhas Series</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className='m1-auto' navbar>
              <NavItem>
                <NavLink className='text-white' style={{fontSize: '20px'}} tag={Link} to='/series'>Séries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='text-white' style={{fontSize: '20px'}} tag={Link} to='/generos'>Gêneros</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
      </div>
    </Navbar>
  )
 }

 export default Header;