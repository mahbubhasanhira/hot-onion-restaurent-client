import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../../App';
import './MakeAdminForm.css';

const MakeAdminForm = () => {
    const {loggedInUser,isAdmin} = useContext(UserContext);
    const [adminEmail, setAdminEmail] = useState('')
    const handleEmailChange = (e) => {
        const newEmail = {...adminEmail}
        newEmail[e.target.name] = e.target.value;
        setAdminEmail(newEmail);
    };
    
const token =  localStorage.getItem('token');
const  handleSubmit = (e) => {
    e.preventDefault();
    if(isAdmin){
        fetch(`https://hot-onion-101.herokuapp.com/make_admin?check_admin=${loggedInUser.email}`, {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    "authorization" : `Bearer ${token}`
                },
                body:JSON.stringify(adminEmail)
            })
            .then(res => res.json())
            .then(data => {
              if(data){
                alert('Admin Successfully Added by You');
                setAdminEmail('');
                window.location.reload();
              }});
    };
    if(!isAdmin){
        alert('Sorry, You are not Admin. So, you can not Add this email as a Admin')
    };
        
}
    
    return (
        <div className='form_container make_adminF services_form_container'>
        <form onSubmit={handleSubmit}> 
            <div className="row w-100">
                <div className="form-row col-md-6 mb-3 ">
                    <label htmlFor='email'>Email</label>
                    <input name='adminEmail' onChange={handleEmailChange} type="email" className='form-control' placeholder='admin@gmail.com' id="email" required/>
                </div>
                <div className="form-row d-flex justify-content-start col-md-6 mb-3 ">
                    <div>
                        <br/>
                        <button type="submit" className="form_submit_btn">Add Admin</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
};

export default MakeAdminForm;