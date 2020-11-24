import React from 'react';
import { useForm } from 'react-hook-form';

const EmailAndPassword = ({onSubmit, setForgotPassword, forgotPassword, setNewUser, newUser}) => {
    
    const { register, handleSubmit, errors } = useForm();

    return (
        <div className='account_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" ref={register({required: true})} name="email" id="" placeholder='Email' />
                <br/>
                {errors.email && <span>Email is required</span>}
                <br/>
                <input type="password" ref={register({ required: true })} name="password"  placeholder='Password'/>
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