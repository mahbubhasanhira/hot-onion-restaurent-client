import React from 'react';
import fbIcon from '../../hot-onion-restaurent-resources/ICON/fb.png';
import googleIcon from '../../hot-onion-restaurent-resources/ICON/google.png';

const FacebookOrGoogle = ({fbSignIn, googleSignIn}) => {
    return (
        <div>
            <p className='or'>OR</p>
            <div onClick={fbSignIn} className='popupSignIn'>
                <img src={fbIcon} alt="sign in with fb"/>
                <button>Continue with Facebook</button>
            </div>
            <div onClick={googleSignIn} className='popupSignIn'>
                <img src={googleIcon} alt="sign in with google"/>
                <button>Continue with Google</button>
            </div>
        </div>
    );
};

export default FacebookOrGoogle;