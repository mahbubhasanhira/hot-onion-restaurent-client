import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../hot-onion-restaurent-resources/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';

const Header = () => {
    const {loggedInUser, setLoggedInUser, isAdmin, cart} = useContext(UserContext);
    
    const getQuantity = cart.map(food =>  food.quantity);
    const cartAllFoodQuantity = getQuantity.reduce((acc, curr) => acc + curr, 0);

    const handleSignOut = () => {
        sessionStorage.removeItem(`userInfo`);
        sessionStorage.removeItem(`token`);
        setLoggedInUser({isSignIn:false});
        
    }

    let redirect_admin = '/login';
    if(loggedInUser.isSignIn){
        if(isAdmin){
            redirect_admin = '/admin/orderList';
        }
        else{
            redirect_admin = '/dashboard/myOrder';
        }
    }

    let redirect_to_Customer = '#';
    if(cart.length > 0){
        redirect_to_Customer = '/dashboard/checkout';
    }

    return (
        <nav className="container header navbar navbar-expand-lg navbar-light">
            <Navbar.Brand className='home'>
                <Link to='/'><img src={logo} alt=""/></Link>
            </Navbar.Brand>
            <Link className='ml-auto checkOutIconForMobile' to={redirect_to_Customer}><FontAwesomeIcon icon={faShoppingCart} /><span className='foodQuantity'>{cartAllFoodQuantity}</span></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <div className="navbar-nav ml-auto d-flex align-items-center">
                    <Link className='checkOutIcon' to={redirect_to_Customer}><FontAwesomeIcon icon={faShoppingCart} /><span className='foodQuantity'>{cartAllFoodQuantity}</span></Link>
                    {
                        loggedInUser.isSignIn &&
                        <p className='userName'>{loggedInUser.name}</p>
                    }
                    <Link className='login_btn' to={redirect_admin}>Dashboard</Link>
                    <div className='sidebar_for_header'>
                        <Sidebar/>
                    </div>
                    {
                        loggedInUser.isSignIn ?
                        <Link className='signIn_btn' onClick={handleSignOut} to=''>Sign Out</Link>
                        :
                        <Link className='signIn_btn' to='/login'>Sign In</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;