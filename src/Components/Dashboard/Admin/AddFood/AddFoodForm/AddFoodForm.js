import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../../App';
import uploadLogo from '../../../../../hot-onion-restaurent-resources/ICON/uploadLogo.PNG';
import './AddFoodForm.css';

const AddFoodForm = () => {
    const {loggedInUser, isAdmin} = useContext(UserContext);
    const [foodDetail, setFoodDetail] = useState({});
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const newFoodDetail = { ...foodDetail };
        newFoodDetail.category = 'Breakfast';
        newFoodDetail[e.target.name] = e.target.value;
        setFoodDetail(newFoodDetail);
    }

const handleFoodDetailSubmit = (e) => {
    e.preventDefault();
    if(isAdmin){
        if(!file || file === undefined){
            alert('Please Select Food Image');
        }
        
        else if(file && file !== undefined){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', foodDetail.name);
            formData.append('title', foodDetail.title);
            formData.append('category', foodDetail.category);
            formData.append('description', foodDetail.description);
            formData.append('price', foodDetail.price);
            formData.append('token', `${'Bearer '+ localStorage.getItem('token')}`)

                fetch(`https://hot-onion-101.herokuapp.com/add_food?check_admin=${loggedInUser.email}`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if(data){
                        alert('Your Food SuccessFully Added.');
                        setFoodDetail({});
                        setFile(null);
                        window.location.reload();
                    }
                }).catch(error => {
                    console.error(error)
                });
        };
    };
    if(!isAdmin){
        alert('Sorry, You are not Admin. So, you can not Add Food in Database');
    };
};
    
    const handleImage = e => {
        if (e.target?.files[0]?.type?.slice(0, 5) === 'image') {
            if (e.target?.files[0]?.size < 800000 ) {
                setFile(e.target?.files[0]);
            }
            else {
                alert('Image size is too large. You can upload around 500kb');
            }
        } else {
            alert('Please Select Just Image');
        }
    }
    
    return (
        <div className='form_container'>
            <form onSubmit={handleFoodDetailSubmit}> 
                <div className="form-group">
                    <input type="text" onChange={handleChange} name='name' className="form-control"  placeholder="Food Name" required/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={handleChange} name='title' className="form-control"  placeholder="Food Title" required/>
                </div>
                <div className="form-group">
                    <select id="category" className="form-control" onChange={handleChange} name='category' required>
                        <option  id='selected' value="Breakfast">Breakfast</option>
                        <option  value="Lunch">Lunch</option>
                        <option  value="Dinner">Dinner</option>
                        <option  value="Snacks">Snacks</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea  onChange={handleChange} name='description' className="form-control" placeholder='Description' rows="4"  required/>
                </div>
                <div className="form-row mb-3 d-flex align-items-center">
                    <div className="form-group col-sm-6 my-1">
                        <input type="number" min='0' onChange={handleChange} name='price' className="form-control" placeholder="Price" required/>
                    </div>
                    <div className="form-group file_base col-sm-6 my-1">
                        <label className='upload_label' htmlFor="file-1"><img className='upload_img' src={uploadLogo} alt="upload"/> <span>Upload Food img</span></label> 
						<input type="file" name="myFile" id="" onChange={e => handleImage(e)} />
                    </div>
                </div>
                <button type="submit" className="d-flex justify-content-start form_submit_btn">Add Food</button>
            </form>
        </div>
    );
};

export default AddFoodForm;