import React, { useState } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <Navbar dark={true} color="light" className="sticky-top flex-md-nowrap p-0 shadow" >
      <NavbarBrand href="/" className="col-md-3 col-lg-2 me-0 px-3">
        <img alt="tapup" src="https://tapup-qa.azurewebsites.net/static/media/logo-shell-tapup.eb70bc82.svg" className="w-40 pl3" />
      </NavbarBrand>
      <NavbarToggler
        onClick={toggleNavbar}
        className="mr-2"
      />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="#" className="px-3">Sign out</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar >
  )
}

Header.propTypes = {

}

export default Header

