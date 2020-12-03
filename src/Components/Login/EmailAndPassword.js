import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EmailAndPassword = ({ onSubmit, setForgotPassword, forgotPassword, setNewUser, newUser}) => {
    
    const [typeText, setTypeText] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    return (
        <div className='account_container'>
            <div className='mb-4 pt-2 ml-auto mr-auto' style={{width:'350px',borderRadius:'5px', border:'1px solid lightgray', backgroundColor:'#ff312627'}}>
                <p className='mt-0 mb-0'><strong>Note That: </strong>If you want check Admin Panel? <br/> Then you must use.<br/></p>
                <p ><strong>email:</strong><span> admin@gmail.com</span><br/><strong>Password:</strong><span> @admin123</span></p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" defaultValue='admin@gmail.com' ref={register({required: true})} name="email" id="" placeholder='Email' />
                <br/>
                {errors.email && <span>Email is required</span>}
                <br/>
               
                    <input style={{display:'inline-block'}} type={typeText ? 'text': 'password'}  defaultValue='@admin123' ref={register({ required: true })} name="password"  placeholder='Password'/>
                    { typeText ? 
                                <FontAwesomeIcon onClick={() => setTypeText(!typeText)} className='typeChangeIcon' icon={faEye} />
                            :
                                <FontAwesomeIcon onClick={() => setTypeText(!typeText)} className='typeChangeIcon' icon={faEyeSlash}/>
                    }
                
                <br/>
                {errors.password && <span>Password is required</span>}
                <br/>    
                <div >
                    <input type="checkbox" name="remember" id="remember"/>
                    <label htmlFor="remember">Remember Me</label>
                    <span onClick={() => setForgotPassword(!forgotPassword)} className='forgot_password'>Forgot Password</span>
                </div>
                <input type="submit" value='Sign in' id="sign_up"/>   
            </form>
            <p>Don't Have an Account? <span onClick={() => setNewUser(!newUser)} className='have_account'>Create an Account</span></p>
        </div>
    );
};

export default EmailAndPassword;