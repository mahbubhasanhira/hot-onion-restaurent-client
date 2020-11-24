import React from 'react';
import { useForm } from 'react-hook-form';

const CreateAccount = ({onSubmit, setNewUser, newUser}) => {

    const { register, handleSubmit, watch, errors } = useForm();

    return (
        <div className='account_container'>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <input type="text" ref={register({required: true})}  name='name' placeholder='Full Name'/>
                <br/>
                {errors.name && <span>Full Name is required</span>}
                <br/>
                <input type="email" ref={register({required: true})} name="email" id="" placeholder='Email' />
                <br/>
                {errors.email && <span>Email is required</span>}
                <br/>
                <input type="password" ref={register({ required: true })} name="password"  placeholder='Password'/>
                <br/>
                {errors.password && <span>Password is required</span>}
                <br/>
                <input type="password" ref={register({validate: (value) => value === watch('password')})} name='confirmPassword' placeholder='Confirm Password'/>
                <br/>
                {errors.confirmPassword && <span>Password did not matched</span>}
                <br/>
                <input type="submit" value='Sign up' id="sign_up"/>
            </form>
            <p>All Ready Have an Account? <span onClick={() => setNewUser(!newUser)} className='have_account'>Login</span></p>
        </div>
    );
};

export default CreateAccount;