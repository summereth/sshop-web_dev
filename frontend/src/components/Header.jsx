import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaCartShopping, FaUser} from 'react-icons/fa6'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
        {/* expand on a medium screen */}
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <Navbar.Brand href='/'>
                    <img src={logo} alt="SShop" /> 
                    SShop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    {/* align to the right */}
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'><FaCartShopping /> Cart</Nav.Link>
                        <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header