import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesMenu.css';

const CategoriesMenu = ({handleCategories, classCat}) => {
    const handleSession = category => {
        localStorage.setItem('classCat', JSON.stringify(category));
    }
    return (
        <nav className='container nav_item'>
                <ul>
                    <li onClick={() => {handleCategories('All'); handleSession('All')}}>
                        <Link to='' className={`nav_link ${classCat === 'All' ? 'active' : ''}`}>All</Link>
                    </li>
                    <li onClick={() =>{ handleCategories('Breakfast'); handleSession('Breakfast')}}>
                        <Link to='' className={`nav_link ${classCat === 'Breakfast' ? 'active' : ''}`}>Breakfast</Link>
                    </li>
                    <li onClick={() =>{ handleCategories('Lunch'); handleSession('Lunch')}}>
                        <Link to='' className={`nav_link ${classCat === 'Lunch' ? 'active' : ''}`}>Lunch</Link>
                    </li>
                    <li onClick={() =>{ handleCategories('Dinner'); handleSession('Dinner')}}>
                        <Link to='' className={`nav_link ${classCat === 'Dinner' ? 'active' : ''}`}>Dinner</Link>
                    </li>
                    <li onClick={() =>{ handleCategories('Snacks'); handleSession('Snacks')}}>
                        <Link to='' className={`nav_link ${classCat === 'Snacks' ? 'active' : ''}`}>Snacks</Link>
                    </li>
                </ul>
            </nav>
    );
};

export default CategoriesMenu;