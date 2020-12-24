import React from 'react';
import mailChimp_uri from '../../../../mailChimpUri';

const Subscribe = () => {    
    return (
        <form action={mailChimp_uri} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div className='search_input subscribe d-flex justify-content-start mt-5'>
                <input type="email" name="EMAIL" className="form_control" id="mce-EMAIL" placeholder="example@gmail.com" required/>       
                <button className='search_btn' type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" >Subscribe</button>         
            </div> 
        </form>
    );
};

export default Subscribe;