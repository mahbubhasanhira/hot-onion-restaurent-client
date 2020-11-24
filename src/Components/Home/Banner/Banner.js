import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className='banner  justify-content-center'>
            <h1>Best food waiting for your belly</h1><br/>
            <div className='search_input'>
                <input className='form_control' placeholder='Search food item' type="text"/>
                <button className='search_btn'>Search</button>
            </div>
        </div>
    );
};

export default Banner;