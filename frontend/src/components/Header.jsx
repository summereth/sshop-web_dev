import React from 'react';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCartShopping, FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from "../slices/authSlice";
import { clearCart } from '../slices/cartSlice';
import logo from '../assets/logo.png';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutUser] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            dispatch(clearCart());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            {/* expand on a medium screen */}
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt='SShop' /> 
                            SShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/* align to the right */}
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaCartShopping /> 
                                    Cart
                                    { cartItems.length > 0 && (
                                        <Badge pill bg='danger' style={{marginLeft: '5px'}}>
                                            { cartItems.reduce( (acc, item) => acc + item.qty, 0) }
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><FaUser /> Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin">
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
  )
}

export default Header