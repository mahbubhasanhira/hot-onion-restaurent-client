import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesMenu.css';


const CategoriesMenu = ({handleCategories}) => {
    return (
        <nav className='container nav_item'>
                <ul>
                    <li>
                        <Link to='' onClick={() =>handleCategories('Breakfast')} className='nav_link active'>Breakfast</Link>
                    </li>
                    <li>
                        <Link to='' onClick={() =>handleCategories('Lunch')} className='nav_link'>Lunch</Link>
                    </li>
                    <li>
                        <Link to='' onClick={() =>handleCategories('Dinner')} className='nav_link'>Dinner</Link>
                    </li>
                    <li>
                        <Link to='' onClick={() =>handleCategories('Snacks')} className='nav_link'>Snacks</Link>
                    </li>
                </ul>
            </nav>
    );
};

export default CategoriesMenu;