import React from 'react';
import './NotFound.css';
import notFound404 from '../../hot-onion-restaurent-resources/Image/404.gif';
import { Link } from 'react-router-dom';

const Notfound = () => {
    return (
        <div className='notFound'>
            <div className='mb-5'>
                <Link to='/' className='notFoundHome'>Home</Link>
            </div>
           <div>
               <img className='img-fluid notFImg' src={notFound404} alt=""/>
           </div>
        </div>
    );
};

export default Notfound;