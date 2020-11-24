import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCommentAlt, faGripVertical, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css';
import { UserContext } from '../../../App';

const Sidebar = () => {
    const {isAdmin} = useContext(UserContext);
    return (
        <div>
            <div className='sidebar_container'>
                <div className='sidebar_option'>
                    <ul className='for_admin'>
                       { isAdmin &&
                        <li>
                            <Link className='sidebar_link' to="/admin/orderList"><FontAwesomeIcon icon={faGripVertical}/> Order list</Link>
                        </li>
                        }
                        
                        <li>
                            <Link className='sidebar_link' to="/dashboard/myOrder"><FontAwesomeIcon icon={faShoppingCart} /> My Order</Link>
                        </li>

                       {  isAdmin &&
                        <li>
                            <Link className='sidebar_link' to="/admin/addFood"><FontAwesomeIcon icon={faPlus}/> Add Food</Link>
                        </li>
                        }

                        <li>
                            <Link className='sidebar_link' to="/dashboard/review"><FontAwesomeIcon icon={faCommentAlt}/> Review</Link>
                        </li>

                       {  isAdmin &&
                        <li>
                            <Link className='sidebar_link' to="/admin/makeAdmin"><FontAwesomeIcon icon={faUserPlus}/> Make Admin</Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;