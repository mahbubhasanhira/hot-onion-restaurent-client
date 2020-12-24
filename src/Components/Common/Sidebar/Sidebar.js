import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCommentAlt, faGripVertical, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css';
import { UserContext } from '../../../App';

const Sidebar = () => {
    const {isAdmin} = useContext(UserContext);
    const [path, setPath] = useState('/');

    useEffect(() => {
        setPath(window.location.pathname);
    },[path]);

    return (
        <div>
            <div className='sidebar_container'>
                <div className='sidebar_option'>
                    <ul className='for_admin'>
                       { isAdmin &&
                        <li  onClick={() => setPath('/admin/orderList')}>
                            <Link className={`sidebar_link ${(path === '/admin/orderList'|| path === '/admin/orderList/') ? 'sidebar_active' : ''}`} to="/admin/orderList"><FontAwesomeIcon icon={faGripVertical}/> Order list</Link>
                        </li>
                        }
                        
                        <li onClick={() => setPath('/dashboard/myOrder')}>
                            <Link className={`sidebar_link ${(path === '/dashboard/myOrder'|| path === '/dashboard/myOrder/') ? 'sidebar_active' : ''}`} to="/dashboard/myOrder"><FontAwesomeIcon icon={faShoppingCart} /> My Order</Link>
                        </li>

                       {  isAdmin &&
                        <li onClick={() => setPath('/admin/addFood')}>
                            <Link className={`sidebar_link ${(path === '/admin/addFood'|| path === '/admin/addFood/') ? 'sidebar_active' : ''}`} to="/admin/addFood"><FontAwesomeIcon icon={faPlus}/> Add Food</Link>
                        </li>
                        }

                        <li onClick={() => setPath('/dashboard/review')}>
                            <Link className={`sidebar_link ${(path === '/dashboard/review'|| path === '/dashboard/review/') ? 'sidebar_active' : ''}`} to="/dashboard/review"><FontAwesomeIcon icon={faCommentAlt}/> Review</Link>
                        </li>

                       {  isAdmin &&
                        <li onClick={() => setPath('/admin/makeAdmin')}>
                            <Link className={`sidebar_link ${(path === '/admin/makeAdmin'|| path === '/admin/makeAdmin/') ? 'sidebar_active' : ''}`} to="/admin/makeAdmin"><FontAwesomeIcon icon={faUserPlus}/> Make Admin</Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;