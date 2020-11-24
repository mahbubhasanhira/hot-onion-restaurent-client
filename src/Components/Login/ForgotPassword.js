import React from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = ({onSubmit, setForgotPassword, forgotPassword}) => {

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className='account_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" ref={register({required: true})} name="email" id="" placeholder='Email' />
                <br/>
                {errors.email && <span>Email is required</span>}
                <br/>  
                <span onClick={() => setForgotPassword(!forgotPassword)} className='have_account'>Go To Login</span>  
                <br/><br/>
                <input type="submit" value='Get Email For Reset Password' id="sign_up"/>
            </form>
        </div>
    );
};

export default ForgotPassword;