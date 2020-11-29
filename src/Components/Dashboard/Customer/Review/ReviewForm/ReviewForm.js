import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../../App';

const ReviewForm = () => {

    const {loggedInUser} = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    
    const token =  sessionStorage.getItem('token');
     const onSubmit = (data) => {
         const review = {...data, 'img': loggedInUser.photoURL};
        
         fetch(`https://hot-onion-101.herokuapp.com/add_review?user_email=${loggedInUser.email}`, {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    "authorization" : `Bearer ${token}`
                },
                body:JSON.stringify(review)
            })
            .then(res => res.json())
            .then(data => {
              if(data){
                alert('Thank You For Your Review');
                window.location.reload();
              }});
     };

    return (
        <div className='right_inside_container'>
            <div className='form_container'>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <div className="form-group">
                        <input name='name' type="text" defaultValue={loggedInUser.name} className="form-control" placeholder="Your name / Company's name" ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <input name='email' type="email" defaultValue={loggedInUser.email} className="form-control"  placeholder="Your email address" ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <textarea name='review_text' className="form-control" placeholder='Description' rows="4" ref={register({ required: true })} />
                    </div>
                    <button type="submit" className="form_submit_btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;